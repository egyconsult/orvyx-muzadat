// src/app/dashboard/page.tsx - لوحة تحكم Dar Al-Muzadat (محدث)
import { supabase } from '@/lib/supabaseClient'

export default async function Dashboard() {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')

  if (error) {
    console.error('Supabase error:', error)
    return <div className="p-12 text-center text-red-600">خطأ في تحميل المزادات: {error.message}</div>
  }

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
              <p className="text-xl text-gray-600 font-semibold">
                لوحة تحكم دار المزادات الفاخرة
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              رصيدك: <span className="text-2xl">৳ 127,450</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">مزادات نشطة</p>
                <p className="text-3xl font-black text-gray-900">{properties?.length || 0}</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">+12 من الأسبوع الماضي</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">رصيدي</p>
                <p className="text-3xl font-black text-emerald-600">৳ 127,450</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">متاح للمزايدة</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">فائزة</p>
                <p className="text-3xl font-black text-purple-600">8</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">عقارات فزت بيها</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">مشاهدات</p>
                <p className="text-3xl font-black text-orange-600">1,247</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
          </div>
        </div>

        {/* Quick Actions + Lots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
            <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 via-gray-800 to-emerald-800 bg-clip-text text-transparent mb-8 flex items-center gap-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              المزادات النشطة ({properties?.length || 0})
            </h2>
            
            <div className="space-y-6">
              {properties?.map((property) => (
                <div key={property.id} className="group/card bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl hover:shadow-emerald/30 hover:-translate-y-3 transition-all duration-500 overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6 pb-6 border-b border-emerald/20">
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-emerald-700 bg-clip-text text-transparent mb-3">
                        {property.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          عقار فاخر
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          القاهرة الجديدة
                        </span>
                      </div>
                    </div>
                    <div className="text-right min-w-[140px]">
                      <div className="text-3xl lg:text-4xl font-black text-emerald-600 mb-2">
                        {property.current_bid ? 
                          new Intl.NumberFormat('ar-EG', { 
                            style: 'currency', 
                            currency: 'EGP',
                            minimumFractionDigits: 0 
                          }).format(property.current_bid) 
                        : '0 EGP'}
                      </div>
                      <p className="text-emerald-700 font-semibold text-sm uppercase tracking-wide">المزايدة الحالية</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-3 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-sm">نهاية المزاد</p>
                          <p className="text-lg font-bold">
                            {property.end_time ? 
                              new Date(property.end_time).toLocaleDateString('ar-EG', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) 
                            : 'غير محدد'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <div className="flex items-center justify-center text-center">
                        <span className="text-2xl font-black text-blue-600">127</span>
                        <p className="text-xs text-blue-700 font-semibold uppercase ml-2">مزايدة</p>
                      </div>
                    </div>
                    <div className="space-y-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                      <div className="flex items-center justify-center text-center">
                        <span className="text-2xl font-black text-orange-600">4.2K</span>
                        <p className="text-xs text-orange-700 font-semibold uppercase ml-2">مشاهدة</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                        AA
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">أحمد أحمد</p>
                        <p className="text-sm text-gray-500">آخر مزايدة · 2 ساعة مضت</p>
                      </div>
                    </div>
                    <button className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl hover:shadow-emerald/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 whitespace-nowrap">
                      انضم للمزايدة
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-24">
                  <svg className="w-24 h-24 mx-auto mb-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد مزادات حالياً</h3>
                  <p className="text-gray-500">ستظهر المزادات الجديدة هنا قريباً</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              إجراءات سريعة
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-5 font-bold text-lg hover:bg-white/30 transition-all shadow-lg hover:shadow-emerald/20 transform hover:-translate-y-1">
                ➕ مزاد جديد
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-5 font-bold text-lg hover:bg-white/30 transition-all shadow-lg hover:shadow-emerald/20 transform hover:-translate-y-1">
                💰 إيداع رصيد
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-5 font-bold text-lg hover:bg-white/30 transition-all shadow-lg hover:shadow-emerald/20 transform hover:-translate-y-1">
                👤 الملف الشخصي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
