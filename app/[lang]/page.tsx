import CurrencyList from "@/components/CurrencyList";
import { dictionaries } from "./dictionary";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Direction, Locale } from "@/types";

type Props = {
  params: {
    lang: Locale
  }
}

export default function Home({ params: { lang } }: Props) {
  const locale = dictionaries[lang];

  return (<>
    <nav style={{ textAlign: locale.dir === "rtl" ? "left" : "right" }} className="p-6">
      <LocaleSwitcher dir={locale.dir as Direction} current={lang} />
    </nav>
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 dir={locale.dir}>{locale.title}</h1>
      <CurrencyList lang={lang} />
    </main>
  </>);
}
