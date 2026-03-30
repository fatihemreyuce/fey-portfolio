import type { Locale } from "@/i18n/config";

export function withLocale(href: string, locale: Locale): string {
  if (/^https?:\/\//.test(href)) return href;
  const url = new URL(href, "http://local");
  url.searchParams.set("lang", locale);
  return `${url.pathname}${url.search}${url.hash}`;
}
