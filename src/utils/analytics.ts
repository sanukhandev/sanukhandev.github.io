export const GA_ID = import.meta.env.VITE_GA_ID;

type GtagConfig = {
  send_page_view?: boolean;
  [key: string]: unknown;
};

type AnalyticsParamValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsParamValue>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: {
      (command: "js", date: Date): void;
      (command: "config", measurementId: string, config?: GtagConfig): void;
      (command: "event", eventName: string, params?: AnalyticsParams): void;
    };
    __gaInitialized?: boolean;
    __gaScriptRequested?: boolean;
    requestIdleCallback?: (
      callback: () => void,
      opts?: { timeout: number },
    ) => number;
  }
}

type GtagCommand =
  | ["event", string, AnalyticsParams]
  | ["config", string, GtagConfig]
  | ["js", Date];

const pendingCommands: GtagCommand[] = [];

function flushQueuedCommands() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  while (pendingCommands.length > 0) {
    const command = pendingCommands.shift();
    if (!command) {
      break;
    }

    if (command[0] === "js") {
      window.gtag("js", command[1]);
      continue;
    }

    if (command[0] === "config") {
      window.gtag("config", command[1], command[2]);
      continue;
    }

    window.gtag("event", command[1], command[2]);
  }
}

function loadAnalyticsScript() {
  if (!GA_ID || typeof window === "undefined" || window.__gaScriptRequested) {
    return;
  }

  window.__gaScriptRequested = true;
  const injectScript = () => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    script.onload = () => {
      if (typeof window.gtag !== "function") {
        return;
      }
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { send_page_view: false });
      window.__gaInitialized = true;
      flushQueuedCommands();
    };
    document.body.appendChild(script);
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(injectScript, { timeout: 2000 });
  } else {
    window.setTimeout(injectScript, 1200);
  }
}

function ensureAnalyticsReady() {
  if (!GA_ID || typeof window === "undefined") {
    return false;
  }

  loadAnalyticsScript();

  if (typeof window.gtag !== "function") {
    return false;
  }

  if (!window.__gaInitialized) {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      send_page_view: false,
    });
    window.__gaInitialized = true;
    flushQueuedCommands();
  }

  return true;
}

export function trackPageView(url: string) {
  if (!url || !GA_ID || typeof window === "undefined") {
    return;
  }

  if (!ensureAnalyticsReady()) {
    pendingCommands.push([
      "event",
      "page_view",
      {
        page_path: url,
        page_location: window.location.href,
      },
    ]);
    return;
  }

  window.gtag!("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!name || !GA_ID || typeof window === "undefined") {
    return;
  }

  if (!ensureAnalyticsReady()) {
    pendingCommands.push(["event", name, params]);
    return;
  }

  window.gtag!("event", name, params);
}
