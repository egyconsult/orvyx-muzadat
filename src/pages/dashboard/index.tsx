import { supabase } from '@/lib/supabaseClient'

export default async function Dashboard() {
  console.log('🔗 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL!)
  console.log('📡 Fetching properties from Supabase...')
  
  let properties: any[] = []
  
  try {
    const { data, error: supabaseError } = await supabase
      .from('properties')
      .select('*')
    
    console.log('📊 Raw data:', data)
    console.log('❌ Supabase error:', supabaseError)
    
    if (supabaseError) throw supabaseError
    properties = data || []
  } catch (e) {
    console.error('💥 Connection error:', e)
  }

  // Format dates & bids ✅ هنا المتغير معرّف
  const formattedProperties = properties.map(p => ({
    ...p,
    bidFormatted: p.current_bid?.toLocaleString('ar-EG'),
    endDate: new Date(p.end_time).toLocaleDateString('ar-EG')
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-300 bg-clip-text text-transparent mb-24 text-center drop-shadow-2xl tracking-tight">
          مزادات فاخرة
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {formattedProperties.map((property) => (
            <div 
              key={property.id} 
              className="group bg-gradient-to-b from-gray-800/95 via-slate-800/90 to-black/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-700/50 hover:border-emerald-500/70 hover:shadow-emerald-500/40 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-700"
            >
              {/* Image */}
              <div className="h-72 bg-gradient-to-br from-gray-900/80 to-slate-900/60 rounded-3xl mb-12 flex items-center justify-center border border-gray-600/50 group-hover:scale-110 transition-all duration-700 backdrop-blur-xl shadow-2xl">
                <span className="text-8xl drop-shadow-2xl">🏛️</span>
              </div>
              
              {/* Title */}
              <h3 className="text-4xl font-black text-white mb-10 leading-tight drop-shadow-2xl line-clamp-2">
                {property.title}
              </h3>
              
              {/* Bid Section */}
              <div className="pb-12 border-b-2 border-gray-800/50 mb-12">
                <div className="flex justify-between items-end">
                  <div className="text-right">
                    <span className="text-6xl font-black bg-gradient-to-l from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent block leading-tight drop-shadow-2xl">
                      {property.bidFormatted}
                    </span>
                    <span className="text-emerald-400 text-2xl font-semibold ml-4">جنيه مصري</span>
                  </div>
                  <span className="px-8 py-4 bg-gradient-to-r from-emerald-500/30 to-teal-500/20 text-emerald-300 rounded-3xl text-xl font-bold border-2 border-emerald-500/50 backdrop-blur-sm shadow-xl">
                    {property.endDate}
                  </span>
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-emerald-600/95 to-teal-600/95 backdrop-blur-xl py-10 rounded-3xl text-2xl font-black border-2 border-emerald-500/70 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/60 hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                💎 ابدأ المزايدة الحين
              </button>
            </div>
          ))}
        </div>
        
        {formattedProperties.length === 0 && (
          <div className="text-center py-32">
            <div className="text-9xl mb-12 opacity-40">💎</div>
            <h2 className="text-5xl font-black text-gray-300 mb-8">لا مزادات حالياً</h2>
            <p className="text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              أفضل العروض الفاخرة ستظهر قريباً. تابع الإشعارات لأحدث المزادات العالمية.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
