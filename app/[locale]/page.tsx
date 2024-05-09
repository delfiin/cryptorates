import CurrencyList from "@/components/CurrencyList";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return <main className="flex min-h-screen flex-col items-center p-2">
    <h1>{t("title")}</h1>
    <CurrencyList />
  </main>;
}
