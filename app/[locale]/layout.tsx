import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { isRtlLang } from 'rtl-detect';

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Cryptocurrency rates",
  description: "App for displaying cryptocurrency rates from Coinbase API",
};

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export default async function RootLayout({
  children,
  params: { locale }
}: Props) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body dir={isRtlLang(locale) ? "rtl" : "ltr"} className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <nav className="p-6">
            <LocaleSwitcher />
          </nav>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
