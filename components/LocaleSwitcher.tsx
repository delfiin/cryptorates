'use client';

import { useCallback } from "react";
import { useRouter } from 'next/navigation'
import { Locale } from "@/types";
import { useLocale } from "next-intl";

const locales = {
  "lv": "🇱🇻 Latviešu",
  "en": "🇬🇧 English",
  "he": "🇮🇱 עִברִית"
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const onChange = useCallback((e: any) => {
    router.push("/" + e.target.value);
  }, [router]);

  return <select value={locale} onChange={onChange}>
    {(Object.keys(locales) as Locale[]).map((lang: Locale) => {
      const displayName = locales[lang];
      return <option value={lang} key={lang}>{displayName}</option>
    })}
  </select>
}