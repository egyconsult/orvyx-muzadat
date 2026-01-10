// src/pages/dashboard/auctions/[id].tsx - Dar Al-Muzadat Lot Page
import { supabase } from '@/lib/supabaseClient';

interface Lot {
  id: string;
  title: string;
  price: number;
  image_url: string;
  bids_count?: number;
}

export default async function LotPage({ params }: { params: { id: string } }) {
  const lotId = params.id;
  console.log('🆔 Loading lot:', lotId);  // DEBUG

  const { data: lot, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', lotId)
    .single() as { data: Lot | null; error: any };

  console.log('📊 Lot data:', lot);  // DEBUG
  console.log('❌ Error:', error);  // DEBUG

  if (error || !lot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black/90 to-gray-900 text-white p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">مزاد غير موجود</h1>
        <p className="text-xl text-gray-400 mb-8">ID: {lotId} - تحقق من الرابط أو أضف المزاد في Supabase</p>
        <a href="/dashboard" className="bg-emerald-600 px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all">
          ← العودة للمزادات
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/95 via-gray-900/50 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative group">
            <img 
              src={lot.image_url || '/placeholder-villa.jpg'} 
              alt={lot.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-all duration-500 border-4 border-white/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all rounded-2xl" />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-4">
                {lot.title}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                {lot.description || 'عقار فاخر جاهز للمزاد العالمي'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  ${Number(lot.price).toLocaleString()}
                </div>
                <div className="text-sm text-emerald-300 uppercase tracking-wider">السعر الحالي</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {lot.bids_count || 0}
                </div>
                <div className="text-sm text-purple-300 uppercase tracking-wider">مزايدة</div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-xl font-bold py-6 px-8 rounded-2xl hover:from-emerald-700 hover:to-teal-700 shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0">
              المزايدة الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
