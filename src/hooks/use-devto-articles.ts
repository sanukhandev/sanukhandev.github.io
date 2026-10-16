import { useEffect, useState } from "react";
import {
  fetchDevToArticleBySlug,
  fetchDevToArticles,
  type DevToArticle,
} from "@/lib/devto";

const DEVTO_STALE_MS = 1000 * 60 * 15;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();

export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Lightweight, zero-dependency hook for Dev.to article list fetching with 15m in-memory cache.
 * Replaces @tanstack/react-query (~23 kB saved).
 */
export function useDevToArticles(perPage = 12, enabled = true): QueryResult<DevToArticle[]> {
  const cacheKey = `devto-articles-${perPage}`;
  const initialCached = memoryCache.get(cacheKey) as CacheEntry<DevToArticle[]> | undefined;
  const isInitiallyFresh = Boolean(initialCached && Date.now() - initialCached.timestamp < DEVTO_STALE_MS);

  const [data, setData] = useState<DevToArticle[] | undefined>(initialCached?.data);
  const [isLoading, setIsLoading] = useState<boolean>(!isInitiallyFresh && enabled);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const currentCached = memoryCache.get(cacheKey) as CacheEntry<DevToArticle[]> | undefined;
    if (currentCached && Date.now() - currentCached.timestamp < DEVTO_STALE_MS) {
      setData(currentCached.data);
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    setIsError(false);
    setError(null);

    fetchDevToArticles(perPage)
      .then((articles) => {
        if (!active) return;
        memoryCache.set(cacheKey, { data: articles, timestamp: Date.now() });
        setData(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setIsError(true);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [perPage, enabled, cacheKey]);

  return { data, isLoading, isError, error };
}

/**
 * Lightweight, zero-dependency hook for fetching single Dev.to article by slug.
 */
export function useDevToArticle(slug?: string): QueryResult<DevToArticle | null> {
  const cacheKey = `devto-article-${slug}`;
  const initialCached = slug ? (memoryCache.get(cacheKey) as CacheEntry<DevToArticle | null> | undefined) : undefined;
  const isInitiallyFresh = Boolean(initialCached && Date.now() - initialCached.timestamp < DEVTO_STALE_MS);

  const [data, setData] = useState<DevToArticle | null | undefined>(initialCached?.data);
  const [isLoading, setIsLoading] = useState<boolean>(!isInitiallyFresh && Boolean(slug));
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const currentCached = memoryCache.get(cacheKey) as CacheEntry<DevToArticle | null> | undefined;
    if (currentCached && Date.now() - currentCached.timestamp < DEVTO_STALE_MS) {
      setData(currentCached.data);
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    setIsError(false);
    setError(null);

    fetchDevToArticleBySlug(slug)
      .then((article) => {
        if (!active) return;
        memoryCache.set(cacheKey, { data: article, timestamp: Date.now() });
        setData(article);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setIsError(true);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug, cacheKey]);

  return { data, isLoading, isError, error };
}
