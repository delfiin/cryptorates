'use client';

import { useEffect, useState } from "react";
import CryptoIcon from "./CryptoIcon";
import { dictionaries } from "@/app/[lang]/dictionary";
import { Direction, Locale } from "@/types";

async function getCurrencyRates() {
  try {
    const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=EUR')

    if (!res.ok) {
      throw new Error("fetchError")
    }

    return res.json()
  } catch (e) {
    throw new Error("networkError");
  }
}

type Props = {
  lang: Locale;
};

export default function CurrencyList({ lang }: Props) {
  const [rates, setRates] = useState({} as any);
  const [error, setError] = useState("" as any);
  const locale = dictionaries[lang];

  useEffect(() => {
    async function runEffect() {
      setError("");
      try {
        const { data: { rates: _rates } } = await getCurrencyRates();
        setRates(_rates);
      } catch (e: any) {
        setRates({});
        setError(locale[e.message as "fetchError" | "networkError"]);
      }
    }
    runEffect();
  }, [])

  const dir = locale.dir as Direction;

  if (error) {
    return <span className="message">
      {dir === "ltr" ? "⛔ " : ""}{error}{dir === "rtl" ? " ⛔" : ""}
    </span>;
  }

  if (Object.keys(rates).length < 1) {
    return <span className="message">{locale.loading}</span>;
  }

  const elements = Object.keys(rates).map(crypto => {
    const rate = parseFloat((1 / rates[crypto]).toFixed(16)).toLocaleString(lang);

    let cols;

    if (dir === "ltr") {
      cols = <div className="grid grid-cols-4 gap-3">
        <div><CryptoIcon dir={dir} crypto={crypto} /></div>
        <div className="col-span-2 p-1">{crypto}/EUR</div>
        <div className="p-1">{rate}</div>
      </div>;
    } else {
      cols = <div className="grid grid-cols-4 gap-3">
        <div style={{ textAlign: "right" }} className="p-1">{rate}</div>
        <div style={{ textAlign: "right" }} className="col-span-2 p-1">{crypto}/EUR</div>
        <div style={{ textAlign: "right" }}><CryptoIcon dir={dir} crypto={crypto} /></div>
      </div>
    }

    return <li className="rate-item" key={crypto} style={{ padding: "6px", margin: "3px" }}>
      {cols}
    </li>
  });

  return <ul>
    {elements}
  </ul>
}