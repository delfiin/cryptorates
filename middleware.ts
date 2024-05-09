import { NextResponse } from "next/server";
import { Locale } from "./types";

const locales: Locale[] = ['en', 'he', 'lv']

// Get the preferred locale, similar to the above or using a library
function getLocale(request: any) {
  return locales[0];
}

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Exclude assets
  if (/\.(ico|svg|png)$/.test(pathname)) return;

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}