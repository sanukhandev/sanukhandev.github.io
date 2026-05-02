export const GA_ID = import.meta.env.VITE_GA_ID;

type GtagConfig = {
  send_page_view?: boolean;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: {
      (command: "js", date: Date): void;
      (command: "config", measurementId: string, config?: GtagConfig): void;
      (command: "event", eventName: string, params?: Record<string, any>): void;
    };
    __gaInitialized?: boolean;
  }
}

function ensureAnalyticsReady() {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }

  if (!window.__gaInitialized) {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      send_page_view: false,
    });
    window.__gaInitialized = true;
  }

  return true;
}

export function trackPageView(url: string) {
  if (!url || !ensureAnalyticsReady()) {
    return;
  }

  window.gtag!("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (!name || !ensureAnalyticsReady()) {
    return;
  }

  window.gtag!("event", name, params);
}
