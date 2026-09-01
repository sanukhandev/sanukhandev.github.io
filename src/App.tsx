import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { LocaleProvider } from "@/hooks/use-locale";
import { trackEvent, trackPageView } from "@/utils/analytics";

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

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const ToolsIndex = lazy(() => import("./pages/ToolsIndex.tsx"));
const BlogIndex = lazy(() => import("./pages/BlogIndex.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const JsonFormatterToolPage = lazy(
  () => import("./pages/tools/JsonFormatterToolPage.tsx"),
);
const ApiClientToolPage = lazy(
  () => import("./pages/tools/ApiClientToolPage.tsx"),
);
const CurlToJsonToolPage = lazy(
  () => import("./pages/tools/CurlToJsonToolPage.tsx"),
);
const NodejsDeveloperUaePage = lazy(
  () => import("./pages/services/NodejsDeveloperUaePage.tsx"),
);
const ReactDeveloperDubaiPage = lazy(
  () => import("./pages/services/ReactDeveloperDubaiPage.tsx"),
);
const ApiIntegrationServicesPage = lazy(
  () => import("./pages/services/ApiIntegrationServicesPage.tsx"),
);
const FullStackConsultantUaePage = lazy(
  () => import("./pages/services/FullStackConsultantUaePage.tsx"),
);
const DevToBlogPage = lazy(() => import("./pages/blog/DevToBlogPage.tsx"));
const JavascriptAlgorithmsPage = lazy(
  () => import("./pages/blog/JavascriptAlgorithmsPage.tsx"),
);
const NodejsApiBestPracticesPage = lazy(
  () => import("./pages/blog/NodejsApiBestPracticesPage.tsx"),
);
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));
const Hero04DemoPage = lazy(() => import("./components/ui/demo.tsx"));

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
            <Route
              path="/blog/javascript-algorithms"
              element={<JavascriptAlgorithmsPage />}
            />
            <Route
              path="/blog/nodejs-api-best-practices"
              element={<NodejsApiBestPracticesPage />}
            />
            <Route path="/blog/:slug" element={<DevToBlogPage />} />
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
