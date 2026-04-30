import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntroPreloader from "@/components/IntroPreloader";
import { ThemeProvider } from "@/hooks/use-theme";
import { LocaleProvider } from "@/hooks/use-locale";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const ToolsIndex = lazy(() => import("./pages/ToolsIndex.tsx"));
const BlogIndex = lazy(() => import("./pages/BlogIndex.tsx"));
const JsonFormatterToolPage = lazy(() => import("./pages/tools/JsonFormatterToolPage.tsx"));
const ApiClientToolPage = lazy(() => import("./pages/tools/ApiClientToolPage.tsx"));
const CurlToJsonToolPage = lazy(() => import("./pages/tools/CurlToJsonToolPage.tsx"));
const NodejsDeveloperUaePage = lazy(() => import("./pages/services/NodejsDeveloperUaePage.tsx"));
const ReactDeveloperDubaiPage = lazy(() => import("./pages/services/ReactDeveloperDubaiPage.tsx"));
const ApiIntegrationServicesPage = lazy(() => import("./pages/services/ApiIntegrationServicesPage.tsx"));
const FullStackConsultantUaePage = lazy(() => import("./pages/services/FullStackConsultantUaePage.tsx"));
const JavascriptAlgorithmsPage = lazy(() => import("./pages/blog/JavascriptAlgorithmsPage.tsx"));
const NodejsApiBestPracticesPage = lazy(() => import("./pages/blog/NodejsApiBestPracticesPage.tsx"));

const queryClient = new QueryClient();
const INTRO_PRELOADER_MS = 1900;

const AppShell = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, INTRO_PRELOADER_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <IntroPreloader />;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/json-formatter-online" element={<JsonFormatterToolPage />} />
            <Route path="/tools/api-client-tool" element={<ApiClientToolPage />} />
            <Route path="/tools/curl-to-json-converter" element={<CurlToJsonToolPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/javascript-algorithms" element={<JavascriptAlgorithmsPage />} />
            <Route path="/blog/nodejs-api-best-practices" element={<NodejsApiBestPracticesPage />} />
            <Route path="/nodejs-developer-uae" element={<NodejsDeveloperUaePage />} />
            <Route path="/react-developer-dubai" element={<ReactDeveloperDubaiPage />} />
            <Route path="/api-integration-services" element={<ApiIntegrationServicesPage />} />
            <Route path="/full-stack-consultant-uae" element={<FullStackConsultantUaePage />} />
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
