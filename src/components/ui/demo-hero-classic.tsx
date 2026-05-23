import SeoMeta from "@/components/SeoMeta";
import Hero from "@/components/sections/Hero";

export default function HeroClassicDemo() {
  return (
    <>
      <SeoMeta
        title="Hero Classic Demo | Sanu Khan"
        description="Demo route for the classic hero component."
        canonicalPath="/demo/hero-classic"
        noindex
      />
      <Hero />
    </>
  );
}
