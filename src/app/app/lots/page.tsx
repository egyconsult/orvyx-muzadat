"use client";

import { useState } from "react";

type Lang = "en" | "ar";

type Lot = {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
};

const lots: Lot[] = [
  {
    id: "lot-001",
    code: "LOT 001",
    titleEn: "A Singular Expression of Craft",
    titleAr: "تجلٍّ فريد لفن الصنعة",
    summaryEn: "Selected for its rarity, verifiable provenance, and long-term significance.",
    summaryAr: "مختار لندرته، وسجل ملكيته الموثَّق، ودلالته طويلة الأمد.",
  },
  {
    id: "lot-002",
    code: "LOT 002",
    titleEn: "A Considered Architectural Statement",
    titleAr: "بيان معماري مدروس",
    summaryEn: "An asset positioned at the intersection of craftsmanship and investment.",
    summaryAr: "أصل يقع عند تقاطع الحِرفة الدقيقة مع جدوى الاستثمار.",
  },
  {
    id: "lot-003",
    code: "LOT 003",
    titleEn: "An Object of Quiet Influence",
    titleAr: "قطعة ذات تأثير هادئ",
    summaryEn: "Curated for collectors who favour discretion over spectacle.",
    summaryAr: "مُنتقاة لمجموعات تفضِّل الخصوصية على الاستعراض.",
  },
];

const translations = {
  en: {
    title: "Lots Under Consideration",
    intro: "Each lot is presented with context, provenance, and a clear invitation to place a considered bid.",
    back: "Back to Private Overview",
    view: "View Lot",
  },
  ar: {
    title: "العناصر قيد الدراسة",
    intro: "يُعرَض كل عنصر بسياق واضح، وسجل ملكية، ودعوة هادئة لتقديم عرض مدروس.",
    back: "عودة إلى المنطقة الخاصة",
    view: "عرض التفاصيل",
  },
} satisfies Record<Lang, any>;

export default function LotsIndexPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <main
      className="min-h-screen bg-black text-neutral-100 flex items-center justify-center px-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl w-full">
        {/* اختيار اللغة + رجوع */}
        <div className="flex items-center justify-between mb-8">
          <a
            href="/app"
            className="text-[11px] uppercase tracking-wide text-neutral-400 hover:text-neutral-200"
          >
            ← {t.back}
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-sm border ${
                lang === "en" ? "border-neutral-100" : "border-neutral-600 text-neutral-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`px-3 py-1 text-sm border ${
                lang === "ar" ? "border-neutral-100" : "border-neutral-600 text-neutral-400"
              }`}
            >
              AR
            </button>
          </div>
        </div>

        {/* العنوان */}
        <header className="mb-8 space-y-3">
          <h1 className="text-2xl md:text-3xl tracking-[0.2em] uppercase">
            {t.title}
          </h1>
          <p className="text-sm md:text-base text-neutral-300 max-w-xl">
            {t.intro}
          </p>
        </header>

        {/* قائمة الـ Lots */}
        <section className="space-y-3">
          {lots.map((lot) => (
            <a
              key={lot.id}
              href={`/app/lots/${lot.id}`}
              className="block border border-neutral-800 px-4 py-3 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                    {lot.code}
                  </div>
                  <div className="text-sm text-neutral-100">
                    {lang === "en" ? lot.titleEn : lot.titleAr}
                  </div>
                  <div className="text-xs text-neutral-400 max-w-2xl">
                    {lang === "en" ? lot.summaryEn : lot.summaryAr}
                  </div>
                </div>
                <div className="text-[11px] uppercase tracking-wide border border-neutral-600 px-3 py-1">
                  {t.view}
                </div>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
