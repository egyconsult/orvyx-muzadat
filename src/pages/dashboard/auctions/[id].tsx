'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

interface Bid {
  id: string;
  auction_id: string;
  amount: number;
  user_id: string;
  created_at: string;
}

interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  current_bid: number;
  start_price: number;
  end_time: string;
  status: 'live' | 'upcoming' | 'ended';
  bids_count: number;
  bids?: Bid[];  // Nested bids from Supabase
}

export default function AuctionDetail() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchAuction() {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          bids (
            id,
            amount,
            created_at,
            user_id
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Auction fetch error:', error);
        setLoading(false);
        return;
      }

      // 🔥 TypeScript fix: explicit nested type
      const auctionData = data as Auction & { bids: Bid[] };
      console.log('🆔 Auction loaded:', auctionData);
      setAuction(auctionData);
      setBids(auctionData.bids || []);
      setLoading(false);
    }

    fetchAuction();

    // Realtime subscription
    const channel = supabase
      .channel('auction-bids')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bids',
          filter: `auction_id=eq.${id}`,
        },
        (payload) => {
          console.log('🔥 Realtime bid:', payload);
          if (payload.eventType === 'INSERT') {
            const newBid = payload.new as Bid;
            setBids((prev) => [...prev, newBid]);
            setAuction((prev) => prev ? { ...prev, current_bid: newBid.amount, bids_count: prev.bids_count + 1 } : prev);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  useEffect(() => {
    if (!auction) return;

    const interval = setInterval(() => {
      const now = new Date().toISOString();
      if (new Date(auction.end_time) <= new Date(now)) {
        setCountdown('انتهى المزاد');
        clearInterval(interval);
      } else {
        const diff = new Date(auction.end_time).getTime() - new Date(now).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${days}أيام ${hours}س ${minutes}د`);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auction]);

const handleBid = async () => {
  if (!newBidAmount || parseFloat(newBidAmount) <= (auction?.current_bid || 0)) {
    alert('المبلغ يجب أن يكون أعلى من العرض الحالي');
    return;
  }

  setBidding(true);
  console.log('🔥 Button clicked! Bid:', newBidAmount);

  const amount = parseFloat(newBidAmount);
  // 🔥 Fix: type-safe user_id
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || 'anonymous';

  const { data, error } = await supabase
    .from('bids')
    .insert({
      auction_id: id,
      amount,
      user_id: userId,  // ← no error
    })
    .select()
    .single();

    console.log('🆕 Bid FULL:', { data, error });
    setBidding(false);
    setNewBidAmount('');

    if (error) {
      alert('❌ ' + error.message);
    } else {
      alert('✅ نجحت المزايدة!');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-white bg-gray-900">جاري التحميل...</div>;
  if (!auction) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">مزاد غير موجود</h1>
      <Link href="/dashboard" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 px-8 py-4 rounded-3xl font-bold">
        عودة للداشبورد
      </Link>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src={auction.image_url || '/placeholder-villa.jpg'}
          alt={auction.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 right-8 left-8 md:right-16 md:left-16">
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-3xl hover:bg-white/20 transition-all duration-300 mb-4">
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            عودة للداشبورد
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{auction.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl leading-relaxed">{auction.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Details */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                تفاصيل المزاد
              </h2>
              <div className="space-y-4 text-xl">
                <p><span className="font-bold text-emerald-400">السعر الحالي:</span> {auction.current_bid.toLocaleString()} جنيه</p>
                <p><span className="font-bold text-emerald-400">المزايدات:</span> {auction.bids_count}</p>
                <p><span className="font-bold text-emerald-400">نهاية المزاد:</span> {countdown}</p>
              </div>
            </div>

            {bids.length > 0 && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">آخر المزايدات</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {bids.slice(-5).reverse().map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center p-4 bg-white/10 rounded-2xl">
                      <span>{bid.amount.toLocaleString()} جنيه</span>
                      <span className="text-sm opacity-75">{new Date(bid.created_at).toLocaleTimeString('ar-EG')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bid Form */}
          <div className="bg-gradient-to-b from-emerald-900/20 to-emerald-900/10 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400 drop-shadow-lg">انضم للمزايدة الحية</h2>
            <div className="space-y-6">
              <div className="text-center p-6 bg-white/10 rounded-2xl">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{auction.current_bid.toLocaleString()}</div>
                <p className="text-xl opacity-90">العرض الحالي (جنيه)</p>
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={newBidAmount}
                  onChange={(e) => setNewBidAmount(e.target.value)}
                  placeholder="أدخل عرضك الجديد"
                  className="w-full text-2xl text-right py-6 px-8 bg-white/10 border-2 border-white/20 rounded-3xl focus:border-emerald-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-300"
                  min={auction.current_bid + 1000}
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-emerald-400 font-bold">جنيه</span>
                </div>
              </div>

              <button
                onClick={handleBid}
                disabled={bidding || !newBidAmount}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-white text-xl md:text-2xl py-6 px-8 rounded-3xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                {bidding ? '⏳ جاري الإرسال...' : '➤ تأكيد المزايدة'}
              </button>
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">الحد الأدنى: {auction.current_bid + 1000} جنيه</p>
          </div>
        </div>
      </div>
    </div>
  );
}
