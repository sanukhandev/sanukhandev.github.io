import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Locale = "en" | "ar";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isSwitchingLocale: boolean;
};

const LOCALE_STORAGE_KEY = "sanukhan-locale";

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [isSwitchingLocale, setIsSwitchingLocale] = useState(false);
  const switchTimerRef = useRef<number | null>(null);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;

      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }

      setIsSwitchingLocale(true);
      setLocaleState(nextLocale);

      switchTimerRef.current = window.setTimeout(() => {
        setIsSwitchingLocale(false);
        switchTimerRef.current = null;
      }, 1500);
    },
    [locale],
  );

  useEffect(
    () => () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }
    },
    [],
  );

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
      toggleLocale: () => setLocale(locale === "en" ? "ar" : "en"),
      isSwitchingLocale,
    }),
    [locale, isSwitchingLocale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
