import { supabase } from '@/lib/supabaseClient'

export default async function Dashboard() {
  console.log('🔗 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL!)
  console.log('📡 Fetching properties from Supabase...')
  
  let properties: any[] = []
  let error = null
  
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
    error = e as Error
  }

  // Format dates & bids
  const formattedProperties = properties.map(p => ({
    ...p,
    bidFormatted: p.current_bid?.toLocaleString('ar-EG'),
    endDate: new Date(p.end_time).toLocaleDateString('ar-EG')
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">
          لوحة التحكم
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedProperties.length > 0 ? (
            formattedProperties.map((property) => (
              <div key={property.id} className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-emerald-200">
                <div className="h-48 bg-gradient-to-r from-emerald-400/30 to-indigo-500/30 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  <span className="text-4xl opacity-80">🏛️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">{property.title}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                      {property.bidFormatted} جنيه
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-indigo-100 text-emerald-800 rounded-xl text-sm font-bold border border-emerald-200">
                      {property.endDate}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-indigo-700 shadow-lg hover:shadow-emerald-500/50 transition-all duration-300">
                    المزايدة الآن
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <div className="text-6xl mb-8">🎉</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">لا توجد مزادات حالياً</h2>
              <p className="text-xl text-gray-500">ستظهر أفضل المزادات الفاخرة هنا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
