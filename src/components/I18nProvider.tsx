"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

const STORAGE_KEY = "portfolio-locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  dict: (typeof dictionaries)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = url.searchParams.get("lang");
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      (param && isLocale(param) && param) ||
      (saved && isLocale(saved) && saved) ||
      defaultLocale;
    setLocaleState(initial);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
    const url = new URL(window.location.href);
    if (url.searchParams.get("lang") !== locale) {
      url.searchParams.set("lang", locale);
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }, [locale, initialized]);

  const setLocale = (next: Locale) => setLocaleState(next);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      dict: dictionaries[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
