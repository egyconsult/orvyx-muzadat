// src/app/dashboard/page.tsx - لوحة تحكم Dar Al-Muzadat
export default function Dashboard() {
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
                <p className="text-3xl font-black text-gray-900">24</p>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              مزادات نشطة
            </h2>
            <div className="space-y-4">
              {['قصر الملك', 'فيلا الشاطئ', 'برج الخليج'].map((title, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="text-sm text-gray-500">المزايدة الحالية: ৳ 2.5M</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold">
                    انضم للمزايدة
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-center">إجراءات سريعة</h3>
            <div className="space-y-4">
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">
                ➕ مزاد جديد
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">
                💰 إيداع رصيد
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-semibold hover:bg-white/30 transition-all">
                👤 الملف الشخصي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
