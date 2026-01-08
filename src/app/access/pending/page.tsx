"use client";

import { useState } from "react";

type Lang = "en" | "ar";

const translations: Record<Lang, { title: string; line1: string; line2: string }> = {
  en: {
    title: "Access Pending",
    line1: "Your request is under review.",
    line2: "You will be notified once a decision has been made.",
  },
  ar: {
    title: "طلب الدخول قيد المراجعة",
    line1: "طلبك حاليًا قيد المراجعة.",
    line2: "سيتم إشعارك عند اتخاذ القرار.",
  },
};

export default function AccessPendingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <main
      className="min-h-screen bg-black text-neutral-100 flex items-center justify-center px-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-xl w-full">
        <div className="flex justify-end mb-8 gap-2">
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

        <section className="space-y-4">
          <h1 className="text-2xl md:text-3xl tracking-[0.2em] uppercase">
            {t.title}
          </h1>
          <p className="text-sm md:text-base text-neutral-300">{t.line1}</p>
          <p className="text-xs md:text-sm text-neutral-400">{t.line2}</p>
        </section>
      </div>
    </main>
  );
}
