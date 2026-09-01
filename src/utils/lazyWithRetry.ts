import { lazy, ComponentType } from "react";

export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    const pageHasAlreadyBeenRefreshed =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("lazy_retry_refreshed") === "true"
        : false;

    try {
      const component = await componentImport();
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("lazy_retry_refreshed", "false");
      }
      return component;
    } catch (error) {
      const isChunkError =
        error instanceof Error &&
        (error.message.includes("Failed to fetch dynamically imported module") ||
          error.message.includes("Importing a module script failed") ||
          error.name === "ChunkLoadError");

      if (isChunkError && typeof window !== "undefined" && !pageHasAlreadyBeenRefreshed) {
        window.sessionStorage.setItem("lazy_retry_refreshed", "true");
        window.location.reload();
        // Return a pending promise while the page reloads
        return new Promise<{ default: T }>(() => {});
      }

      throw error;
    }
  });
}
