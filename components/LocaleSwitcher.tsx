'use client';

import { useCallback } from "react";
import { useRouter } from 'next/navigation'

type Props = {
  current: "lv" | "en" | "he",
  dir: "rtl" | "ltr"
}

const locales = {
  "lv": "Latviešu",
  "en": "English",
  "he": "עִברִית"
};

export default async function LocaleSwitcher({ current, dir }: Props) {
  const router = useRouter();

  const onChange = useCallback((e: any) => {
    router.push("/" + e.target.value);
  }, []);

  return <select dir={dir} value={current} onChange={onChange}>
    {Object.keys(locales).map((lang: any) => {
      const displayName = (locales as any)[lang];
      return <option value={lang} key={lang}>{displayName}</option>
    })}
  </select>
}