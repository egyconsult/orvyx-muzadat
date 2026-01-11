"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuctionDetail() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [auction, setAuction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [timeLeft, setTimeLeft] = useState('02:47:12');
  const [bidding, setBidding] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState('');

  // Fetch auction
  useEffect(() => {
    if (!router.isReady || !id) return;
    console.log('🆔 Auction ID:', id);
    async function fetchAuction() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      console.log('📦 Auction data:', data);
      console.log('❌ Supabase error:', err);
      if (err || !data) {
        setError(`مزاد غير موجود: ${id}`);
      } else {
        setAuction(data);
        setCurrentBid(data.current_bid || 0);
      }
      setLoading(false);
    }
    fetchAuction();
  }, [router.isReady, id]);

  // Realtime + timer
  useEffect(() => {
    if (!auction?.id) return;
    const channel = supabase
      .channel(`auction-${id}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'bids', filter: `auction_id=eq.${id}` },
        (payload) => {
          console.log('🆕 New bid:', payload.new.amount);
          setCurrentBid(payload.new.amount);
        }
      )
      .subscribe();

    const interval = setInterval(() => {
      if (auction.end_time) {  // استخدم end_time زي الـ logs
        const now = new Date();
        const end = new Date(auction.end_time);
        const diff = end.getTime() - now.getTime();
        if (diff > 0) {
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`);
        } else {
          setTimeLeft('انتهى!');
        }
      }
    }, 1000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [auction, id]);

  const handleBid = async () => {
  const amount = parseInt(newBidAmount);
  if (amount <= currentBid + 1000) {
    alert(`الحد الأدنى: $${(currentBid + 1000).toLocaleString()}`);
    return;
  }
  
  setBidding(true);
  
  console.log('🔥 Bid debug:', { auction_id: id, typeof_id: typeof id, amount });
  
  const { data, error } = await supabase
    .from('bids')
    .insert({ 
      auction_id: id.toString(),  // force string
      amount: Number(amount),
      user_id: '550e8400-e29b-41d4-a716-446655440001'  // UUID test جديد صالح
    })
    .select()
    .single();
    
  setBidding(false);
  console.log('🆕 Bid FULL:', { data, error });
  
  if (!error && data) {
    alert('✅ نجحت! ' + amount.toLocaleString());
    setNewBidAmount('');
    window.location.reload();
  } else {
    alert('❌ ' + error.message);
  }
};

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-2xl text-emerald-400">⏳ جاري التحميل...</div>;
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-black/50 backdrop-blur-xl rounded-3xl p-12 text-center border border-neutral-800">
        <h1 className="text-4xl font-bold mb-4 text-red-400">{error}</h1>
        <a href="/dashboard/auctions" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-xl px-12 py-4 rounded-2xl font-bold transition-all">
          ← العودة للمزادات
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-emerald-900 text-white py-12 px-4 md:px-8">
      {/* باقي الـ JSX زي الكود الأصلي، بس غير: */}
      <a href="/dashboard/auctions" className="inline-flex items-center gap-2 mb-8 text-emerald-400 hover:text-emerald-300 text-xl font-bold transition-all">← العودة</a>
      
      {/* Stats: استخدم currentBid من state */}
      <div className="grid grid-cols-2 gap-4 text-center p-6 bg-black/30 backdrop-blur-xl rounded-2xl border border-neutral-800">
        <div><div className="text-2xl font-bold text-emerald-400">${currentBid.toLocaleString()}</div><div className="text-sm text-neutral-400">عرض حالي</div></div>
        <div><div className="text-2xl font-bold">{auction.area || '500'} م²</div><div className="text-sm text-neutral-400">المساحة</div></div>
      </div>

      {/* Bid form */}
      <input 
        type="number" 
        value={newBidAmount}
        onChange={(e) => setNewBidAmount(e.target.value)}
        placeholder="اكتب المبلغ..."
        className="w-full bg-black/50 border border-neutral-600 rounded-2xl px-6 py-5 text-2xl text-right text-white placeholder-neutral-500 focus:border-emerald-400 focus:outline-none transition-all"
        min={currentBid + 1000}
      />
      <p className="text-sm text-emerald-400 mt-1 text-right">الحد الأدنى: ${(currentBid + 1000).toLocaleString()}</p>
      <button 
        onClick={handleBid} 
        disabled={bidding}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-2xl py-6 px-8 rounded-3xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
      >
        {bidding ? '⏳ جاري...' : '➤ تأكيد المزايدة'}
      </button>

      {/* Timer */}
      <div className="text-center p-6 bg-black/40 rounded-2xl">
        <div className="text-3xl font-mono font-bold text-emerald-400 mb-1">{timeLeft}</div>
        <div className="text-lg text-neutral-400">المتبقي</div>
      </div>

      {/* باقي الـ hero image + details زي الأصلي مع auction.title, auction.description */}
      <h1 className="text-4xl md:text-5xl font-black mb-8 text-emerald-300 drop-shadow-lg">{auction.title}</h1>
      <div className="max-w-4xl mx-auto mt-20 p-10 bg-black/30 backdrop-blur-xl rounded-3xl border border-neutral-800">
        <h2 className="text-3xl font-bold mb-8 text-emerald-400">📄 التفاصيل</h2>
        <p className="text-xl leading-relaxed text-neutral-200">{auction.description || 'عقار فاخر جاهز للاستثمار.'}</p>
      </div>
    </div>
  );
}
