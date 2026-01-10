// src/pages/dashboard/index.tsx - الكروت الفاخرة مع Supabase LIVE data
import { supabase } from '@/lib/supabaseClient'

export default async function Dashboard() {
  const { data: properties = [], error } = await supabase
    .from('properties')
    .select('*')

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-12 border border-white/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                مرحباً بك
              </h1>
              <p className="text-xl text-gray-600 font-semibold">لوحة تحكم دار المزادات</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              رصيدك: <span className="text-2xl">EGP 127,450</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">مزادات نشطة</p>
                <p className="text-3xl font-black text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>
          {/* باقي الـ stats زي ما هي */}
        </div>

        {/* الكروت الفاخرة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent mb-8">
              المزادات النشطة ({properties.length})
            </h2>
            <div className="space-y-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald/30 hover:-translate-y-2 transition-all duration-500 group">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent mb-3">
                        {property.title}
                      </h3>
                      <div className="flex gap-3 text-sm text-emerald-100 mb-4">
                        <span className="px-3 py-1 bg-emerald-500/20 rounded-full">نشط</span>
                        <span>المزايدات: 127</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-emerald-400 mb-1">
                        {property.current_bid.toLocaleString()} EGP
                      </div>
                      <p className="text-emerald-200 font-medium">المزايدة الحالية</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="text-center">
                      <p className="text-emerald-100 font-semibold">نهاية المزاد</p>
                      <p className="text-xl font-bold text-white">
                        {new Date(property.end_time).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-100 font-semibold">مشاهدات</p>
                      <p className="text-2xl font-bold text-white">4.2K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-100 font-semibold">مزايدات</p>
                      <p className="text-2xl font-bold text-white">127</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg">AA</div>
                      <div>
                        <p className="font-bold text-white">أحمد أحمد</p>
                        <p className="text-emerald-100 text-sm">آخر مزايدة</p>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-2xl shadow-2xl hover:shadow-emerald/50 transition-all duration-300 hover:scale-105">
                      انضم للمزايدة →
                    </button>
                  </div>
                </div>
              ))}
              {properties.length === 0 && (
                <div className="text-center py-24 text-gray-500 col-span-full">
                  <h3 className="text-3xl font-bold mb-4">لا مزادات حالياً</h3>
                  <p>البيانات في Supabase table: properties</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-center">إجراءات سريعة</h3>
            <div className="space-y-4">
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">➕ مزاد جديد</button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">💰 إيداع رصيد</button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">👤 الملف الشخصي</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
