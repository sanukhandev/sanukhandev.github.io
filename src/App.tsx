import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { LocaleProvider } from "@/hooks/use-locale";
import { trackEvent, trackPageView } from "@/utils/analytics";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const ToolsIndex = lazy(() => import("./pages/ToolsIndex.tsx"));
const BlogIndex = lazy(() => import("./pages/BlogIndex.tsx"));
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
const JavascriptAlgorithmsPage = lazy(
  () => import("./pages/blog/JavascriptAlgorithmsPage.tsx"),
);
const NodejsApiBestPracticesPage = lazy(
  () => import("./pages/blog/NodejsApiBestPracticesPage.tsx"),
);
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));

const queryClient = new QueryClient();

function AnalyticsTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef("");
  const pagePath = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (lastTrackedPath.current === pagePath) {
      return;
    }

    trackPageView(pagePath);
    lastTrackedPath.current = pagePath;
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
        trackEvent("scroll_75");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagePath]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackEvent("engaged_60s");
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
      <BrowserRouter>
        <AnalyticsTracker />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/faq" element={<FaqPage />} />
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
