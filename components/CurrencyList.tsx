'use client';

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CryptoIcon from "./CryptoIcon";

async function getCurrencyRates() {
  try {
    const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=EUR')

    if (!res.ok) {
      throw new Error();
    }

    return res.json()
  } catch (e) {
    throw new Error("fetchError");
  }
}

export default function CurrencyList() {
  const t = useTranslations();
  const locale = useLocale();
  const [rates, setRates] = useState({} as { [key: string]: number });
  const [error, setError] = useState("");

  useEffect(() => {
    async function runEffect() {
      setError("");
      try {
        const { data: { rates } } = await getCurrencyRates();
        setRates(rates);
      } catch (e) {
        setRates({});
        setError(t((e as Error).message));
      }
    }
    runEffect();
  }, [t])

  if (error) {
    return <span className="message">
      ⛔ {error}
    </span>;
  }

  if (Object.keys(rates).length < 1) {
    return <span className="message">{t("loading")}</span>;
  }

  const elements = Object.keys(rates).map(crypto => {
    const rate = parseFloat((1 / rates[crypto]).toFixed(16)).toLocaleString(locale);

    return <li className="rate-item" key={crypto}>
      <div className="grid grid-cols-4 gap-3">
        <div><CryptoIcon crypto={crypto} /></div>
        <div className="col-span-2 p-1" dir="ltr">{crypto}/EUR</div>
        <div className="p-1">{rate}</div>
      </div>
    </li>
  });

  return <ul>
    {elements}
  </ul>
}