"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

type Lang = "en" | "ar";

type LotDetail = {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string[];
  bodyAr: string[];
};

const lots: LotDetail[] = [
  {
    id: "lot-001",
    code: "LOT 001",
    titleEn: "A Singular Expression of Craft",
    titleAr: "تجلٍّ فريد لفن الصنعة",
    bodyEn: [
      "This piece stands apart not through abundance, but through consequence.",
      "Its provenance is verifiable. Its condition exemplary. Its presence undeniable.",
      "Selected for ORVYX for its rarity, craftsmanship, and long-term significance.",
    ],
    bodyAr: [
      "تتميّز هذه القطعة ليس بالكثرة، بل بالأثر الذي تتركه.",
      "سجل ملكيتها قابل للتحقق. حالتها نموذجية. حضورها لا يمكن تجاهله.",
      "مختارة لـ ORVYX لندرتهـا، ودقة صناعتها، ودلالتها طويلة الأمد.",
    ],
  },
  {
    id: "lot-002",
    code: "LOT 002",
    titleEn: "A Considered Architectural Statement",
    titleAr: "بيان معماري مدروس",
    bodyEn: [
      "An asset situated at the intersection of architecture, craft, and investment.",
      "Its structure, orientation, and finish have been selected with long-term placement in mind.",
    ],
    bodyAr: [
      "أصل يقع عند تقاطع العمارة الحصيفة مع الحِرفة والاستثمار.",
      "تم اختيار تكوينه، واتجاهه، وتشطيباته بعناية لملاءمة الاحتفاظ طويل الأمد.",
    ],
  },
  {
    id: "lot-003",
    code: "LOT 003",
    titleEn: "An Object of Quiet Influence",
    titleAr: "قطعة ذات تأثير هادئ",
    bodyEn: [
      "Curated for collectors who favour discretion over spectacle.",
      "Its value is read in the details, not in volume or noise.",
    ],
    bodyAr: [
      "مُنتقاة لمجموعات تفضِّل الخصوصية على الاستعراض.",
      "تُقرأ قيمتها في التفاصيل الدقيقة، لا في الكثرة أو الضجيج.",
    ],
  },
];

const translations = {
  en: {
    back: "Back to Lots",
    sectionLabel: "Lot Detail",
    bidCta: "Place Considered Bid",
  },
  ar: {
    back: "عودة إلى العناصر",
    sectionLabel: "تفاصيل العنصر",
    bidCta: "تقديم عرض مدروس",
  },
} satisfies Record<Lang, any>;

export default function LotDetailPage() {
  const params = useParams<{ id: string }>();
  const [lang, setLang] = useState<Lang>("en");

  const lot = lots.find((l) => l.id === params.id);

  if (!lot) {
    return (
      <main className="min-h-screen bg-black text-neutral-100 flex items-center justify-center px-6">
        <p className="text-sm text-neutral-400">Lot not found.</p>
      </main>
    );
  }

  const t = translations[lang];

  return (
    <main
      className="min-h-screen bg-black text-neutral-100 flex items-center justify-center px-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl w-full">
        {/* أعلى الصفحة */}
        <div className="flex items-center justify-between mb-8">
          <a
            href="/app/lots"
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

        {/* محتوى اللوت */}
        <section className="space-y-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            {lot.code} · {t.sectionLabel}
          </div>

          <h1 className="text-2xl md:text-3xl text-neutral-100">
            {lang === "en" ? lot.titleEn : lot.titleAr}
          </h1>

          <div className="space-y-2 text-sm md:text-base text-neutral-300 max-w-2xl">
            {(lang === "en" ? lot.bodyEn : lot.bodyAr).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="border border-neutral-200 px-6 py-2 text-sm tracking-wide uppercase hover:bg-neutral-100 hover:text-black transition-colors"
            >
              {t.bidCta}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
