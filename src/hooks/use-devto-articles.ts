import { useQuery } from "@tanstack/react-query";
import {
  fetchDevToArticleBySlug,
  fetchDevToArticles,
  type DevToArticle,
} from "@/lib/devto";

const DEVTO_STALE_MS = 1000 * 60 * 15;

export const useDevToArticles = (perPage = 12) =>
  useQuery<DevToArticle[]>({
    queryKey: ["devto-articles", perPage],
    queryFn: () => fetchDevToArticles(perPage),
    staleTime: DEVTO_STALE_MS,
  });

export const useDevToArticle = (slug?: string) =>
  useQuery<DevToArticle | null>({
    queryKey: ["devto-article", slug],
    queryFn: () => fetchDevToArticleBySlug(slug || ""),
    staleTime: DEVTO_STALE_MS,
    enabled: Boolean(slug),
  });
