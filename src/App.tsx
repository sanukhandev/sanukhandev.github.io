import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { LocaleProvider } from "@/hooks/use-locale";
import { trackEvent, trackPageView } from "@/utils/analytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazyWithRetry } from "@/utils/lazyWithRetry";

const runWhenIdle = (fn: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(() => fn(), { timeout: 1200 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
};

const Index = lazyWithRetry(() => import("./pages/Index.tsx"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound.tsx"));

const ToolsIndex = lazyWithRetry(() => import("./pages/ToolsIndex.tsx"));
const BlogIndex = lazyWithRetry(() => import("./pages/BlogIndex.tsx"));
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage.tsx"));
const ProjectsPage = lazyWithRetry(() => import("./pages/ProjectsPage.tsx"));
const ContactPage = lazyWithRetry(() => import("./pages/ContactPage.tsx"));
const JsonFormatterToolPage = lazyWithRetry(
  () => import("./pages/tools/JsonFormatterToolPage.tsx"),
);
const ApiClientToolPage = lazyWithRetry(
  () => import("./pages/tools/ApiClientToolPage.tsx"),
);
const CurlToJsonToolPage = lazyWithRetry(
  () => import("./pages/tools/CurlToJsonToolPage.tsx"),
);
const NodejsDeveloperUaePage = lazyWithRetry(
  () => import("./pages/services/NodejsDeveloperUaePage.tsx"),
);
const ReactDeveloperDubaiPage = lazyWithRetry(
  () => import("./pages/services/ReactDeveloperDubaiPage.tsx"),
);
const ApiIntegrationServicesPage = lazyWithRetry(
  () => import("./pages/services/ApiIntegrationServicesPage.tsx"),
);
const FullStackConsultantUaePage = lazyWithRetry(
  () => import("./pages/services/FullStackConsultantUaePage.tsx"),
);
const DevToBlogPage = lazyWithRetry(() => import("./pages/blog/DevToBlogPage.tsx"));
const JavascriptAlgorithmsPage = lazyWithRetry(
  () => import("./pages/blog/JavascriptAlgorithmsPage.tsx"),
);
const NodejsApiBestPracticesPage = lazyWithRetry(
  () => import("./pages/blog/NodejsApiBestPracticesPage.tsx"),
);
const FaqPage = lazyWithRetry(() => import("./pages/FaqPage.tsx"));
const Hero04DemoPage = lazyWithRetry(() => import("./components/ui/demo.tsx"));

const queryClient = new QueryClient();

const routeFallback = (
  <div
    className="min-h-[60vh] bg-background"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  />
);

function AnalyticsTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef("");
  const pagePath = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (lastTrackedPath.current === pagePath) {
      return;
    }

    const cleanup = runWhenIdle(() => {
      trackPageView(pagePath);
      lastTrackedPath.current = pagePath;
    });

    return cleanup;
  }, [pagePath]);

  useEffect(() => {
    let hasTrackedScroll = false;

    const handleScroll = () => {
      if (hasTrackedScroll) {
        return;
      }

      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      if (height <= 0) {
        return;
      }

      if (scrolled / height > 0.75) {
        hasTrackedScroll = true;
        runWhenIdle(() => trackEvent("scroll_75"));
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagePath]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      runWhenIdle(() => trackEvent("engaged_60s"));
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [pagePath]);

  return null;
}

const AppShell = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AnalyticsTracker />
        <ErrorBoundary>
          <Suspense fallback={routeFallback}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<ToolsIndex />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/demo/hero-04" element={<Hero04DemoPage />} />
              <Route
                path="/tools/json-formatter-online"
                element={<JsonFormatterToolPage />}
              />
              <Route
                path="/tools/api-client-tool"
                element={<ApiClientToolPage />}
              />
              <Route
                path="/tools/curl-to-json-converter"
                element={<CurlToJsonToolPage />}
              />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blogs" element={<Navigate to="/blog" replace />} />
              <Route
                path="/blog/javascript-algorithms"
                element={<JavascriptAlgorithmsPage />}
              />
              <Route
                path="/blog/nodejs-api-best-practices"
                element={<NodejsApiBestPracticesPage />}
              />
              <Route path="/blog/:slug" element={<DevToBlogPage />} />
              <Route path="/blogs/:slug" element={<Navigate to="/blog/:slug" replace />} />
              <Route
                path="/nodejs-developer-uae"
                element={<NodejsDeveloperUaePage />}
              />
              <Route
                path="/react-developer-dubai"
                element={<ReactDeveloperDubaiPage />}
              />
              <Route
                path="/api-integration-services"
                element={<ApiIntegrationServicesPage />}
              />
              <Route
                path="/full-stack-consultant-uae"
                element={<FullStackConsultantUaePage />}
              />
              <Route
                path="/services/nodejs-backend-engineer"
                element={<NodejsDeveloperUaePage />}
              />
              <Route
                path="/services/react-developer-dubai"
                element={<ReactDeveloperDubaiPage />}
              />
              <Route
                path="/services/azure-cloud-architect"
                element={<ApiIntegrationServicesPage />}
              />
              <Route
                path="/services/full-stack-developer-uae"
                element={<FullStackConsultantUaePage />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
