import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import { useLocale, type Locale } from "@/hooks/use-locale";

export type { Locale };
export type ContentSchema = typeof en;
export type SectionKey = keyof ContentSchema;

const translations: Record<Locale, ContentSchema> = {
  en,
  ar: ar as ContentSchema,
};

/**
 * Pure helper function to fetch complete content dictionary by locale.
 */
export function getContent(locale: Locale = "en"): ContentSchema {
  return translations[locale] || translations.en;
}

/**
 * Pure helper function to fetch section-specific content for any component/section.
 */
export function getSectionData<K extends SectionKey>(
  section: K,
  locale: Locale = "en"
): ContentSchema[K] {
  const dict = translations[locale] || translations.en;
  return dict[section] || translations.en[section];
}

/**
 * React hook to retrieve reactive section-specific content based on active locale.
 */
export function useSectionData<K extends SectionKey>(section: K): ContentSchema[K] {
  const { locale } = useLocale();
  return getSectionData(section, locale);
}
