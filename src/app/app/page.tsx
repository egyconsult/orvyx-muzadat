'use client'

import { useState } from 'react'
import Link from 'next/link'

type Lang = 'en' | 'ar'

type Translations = {
  title: string
  subtitle: string
  viewLots: string
  currentSelections: string
  bids: string
}

const translations: Record<Lang, Translations> = {
  en: {
    title: 'Private Overview',
    subtitle: 'Current Selections & Participation',
    viewLots: 'View Lots',
    currentSelections: 'Current Selections',
    bids: 'Active Bids'
  },
  ar: {
    title: 'نظرة عامة خاصة',
    subtitle: 'الاختيارات الحالية والمشاركة',
    viewLots: 'عرض العناصر',
    currentSelections: 'الاختيارات الحالية',
    bids: 'العروض النشطة'
  }
}

export default function PrivateOverview() {
  const [lang, setLang] = useState<Lang>('ar')
  const t = translations[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar' as Lang)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-lg font-semibold text-slate-800 hover:bg-white hover:shadow-xl hover:border-teal-300 transition-all duration-300"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className={`bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl p-12 border border-white/50 ${dir}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent mb-6">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/app/lots" className="group">
              <div className="group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white p-10 rounded-3xl border-2 border-slate-200 hover:border-teal-300 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 bg-white/50 backdrop-blur-sm">
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-2xl font-bold mb-4">{t.viewLots}</h3>
                <p className="text-lg text-slate-600 group-hover:text-teal-100">
                  Explore current auction lots and place considered bids
                </p>
              </div>
            </Link>

            <div className="p-10 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-100 to-teal-100 shadow-xl">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4">{t.currentSelections}</h3>
              <p className="text-lg text-slate-700">
                Track your active selections and bidding status
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl">
                  <span>LOT 001</span>
                  <span className="font-bold text-teal-600">$2.1M</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl">
                  <span>LOT 002</span>
                  <span className="font-bold text-emerald-600">$1.8M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <Link
              href="/app/bids"
              className="inline-block bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:from-teal-700 hover:to-emerald-700 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
            >
              {t.bids}
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        div[dir="rtl"] {
          direction: rtl;
        }
        div[dir="rtl"] * {
          direction: rtl;
        }
      `}</style>
    </div>
  )
}
