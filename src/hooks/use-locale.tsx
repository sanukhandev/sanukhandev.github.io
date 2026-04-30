import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "ar";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LOCALE_STORAGE_KEY = "sanukhan-locale";

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.classList.toggle("locale-ar", locale === "ar");
    root.classList.toggle("locale-en", locale === "en");
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === "en" ? "ar" : "en")),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
