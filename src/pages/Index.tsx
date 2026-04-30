import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Works from "@/components/sections/Works";
import Articles from "@/components/sections/Articles";
import Certifications from "@/components/sections/Certifications";
import Footer from "@/components/sections/Footer";
import ZaakiyChatWidget from "@/components/ZaakiyChatWidget";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";

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
        <Works />
        <Services />
        <Skills />
        <Certifications />
        <Articles />
      </main>
      <Footer />
      <ZaakiyChatWidget />
    </div>
  );
};

export default Index;
