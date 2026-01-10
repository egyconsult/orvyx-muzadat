import { supabase } from '@/lib/supabaseClient'

// Type بسيط (اختياري)
interface Property {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  image_url?: string;
  image?: string;
  bids_count?: number;
}

export default async function Dashboard() {
  console.log('🟢 Dashboard loading...');
  
  const { data: properties = [], error } = await supabase
    .from('properties')
    .select('*')
    .limit(10);
  
  console.log('📊 Properties count:', properties.length);
  console.log('Raw properties:', properties); // DEBUG كامل
  console.log('❌ Error:', error);
  
  if (error) {
    console.error('Supabase error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white p-12 text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-4">خطأ في التحميل</h1>
        <p className="text-xl text-gray-400">{error.message}</p>
        <pre className="mt-8 p-4 bg-red-900/50 rounded-xl text-sm">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const formattedProperties = properties.map((p: Property) => ({
  ...p,
  formattedPrice: `$${Number(p.current_bid || 0).toLocaleString()}`, // current_bid مش price
  image_url: p.image_url || p.image || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&fit=crop',
  bids_count: p.bids_count || Math.floor(Math.random() * 50) + 5, // random bids
  title: p.title || 'عقار فاخر',
  description: `مزاد فاخر ينتهي ${new Date(p.end_time).toLocaleDateString('ar-EG')}`, // end_time
}));

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-black/95 via-slate-900 to-gray-900/80 text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl">
        <div className="text-center mb-20 lg:mb-28">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-teal-400 via-emerald-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl tracking-tightest leading-tight">
            مزادات فاخرة
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            أرقى العقارات العالمية في مزادات حصرية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {formattedProperties.length > 0 ? (
            formattedProperties.map((property, idx) => (
              <article 
                key={property.id || `prop-${idx}`}
                className="group relative bg-gradient-to-b from-slate-800/70 via-gray-900/60 to-black/80 backdrop-blur-xl border border-gray-700/50 hover:border-teal-500/70 rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-teal-500/30 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] overflow-hidden hover:shadow-3xl"
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Image */}
                  <div className="w-full h-48 lg:h-56 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-gray-800 group-hover:scale-105 transition-all duration-700">
                    <img 
                      src={property.image_url} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-villa.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <header className="mb-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-teal-300 transition-colors duration-300">
                      {property.title}
                    </h3>
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed line-clamp-3 mb-6">
                      {property.description}
                    </p>
                  </header>
                  
                  {/* Price & Bids */}
                  <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
                    <span className="text-3xl lg:text-4xl font-black text-teal-400 drop-shadow-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/20 px-4 py-2 rounded-xl">
                      {property.formattedPrice}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 border border-teal-400/30 rounded-full text-sm lg:text-base font-semibold shadow-lg">
                      {property.bids_count} مزايدة
                    </span>
                  </div>
                  
                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-purple-600 hover:from-teal-600 hover:via-emerald-600 hover:to-purple-700 text-white py-4 px-6 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-400 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                    <span>ابدأ المزايدة</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 px-8 text-center bg-gradient-to-r from-slate-800/50 to-gray-900/50 rounded-3xl backdrop-blur-xl border-2 border-dashed border-gray-600/50">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                <span className="text-4xl lg:text-5xl">🏛️</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-300 mb-4">لا مزادات حالياً</h3>
              <p className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed">
                أفضل العروض الفاخرة ستظهر قريباً. فعّل الإشعارات لأحدث المزادات العالمية الفاخرة.
              </p>
            </div>
          )}
        </div>
        
        {/* Debug info - امسحه بعد الاختبار */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 p-6 bg-slate-900/50 border border-teal-500/30 rounded-2xl">
            <details className="text-sm text-gray-400">
              <summary>Debug Info ({formattedProperties.length} items)</summary>
              <pre className="mt-4 p-4 bg-black/50 rounded-xl text-xs overflow-auto max-h-60">
                {JSON.stringify(formattedProperties.slice(0, 2), null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
