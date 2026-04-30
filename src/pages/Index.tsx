import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";

const Works = lazy(() => import("@/components/sections/Works"));
const Services = lazy(() => import("@/components/sections/Services"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Certifications = lazy(() => import("@/components/sections/Certifications"));
const Articles = lazy(() => import("@/components/sections/Articles"));
const Footer = lazy(() => import("@/components/sections/Footer"));
const ZaakiyChatWidget = lazy(() => import("@/components/ZaakiyChatWidget"));

const sectionFallback = (
  <div className="container-narrow section-pad">
    <div className="h-40 animate-pulse rounded-2xl bg-muted" />
  </div>
);

const Index = () => {
  const { isSwitchingLocale } = useLocale();

  if (isSwitchingLocale) {
    return <LocaleSwitchSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={sectionFallback}>
          <Works />
          <Services />
          <Skills />
          <Certifications />
          <Articles />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ZaakiyChatWidget />
      </Suspense>
    </div>
  );
};

export default Index;
