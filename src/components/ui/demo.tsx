import SeoMeta from "@/components/SeoMeta";
import { HeroSection04 } from "@/components/ui/hero-04";

export default function DemoOne() {
  return (
    <>
      <SeoMeta
        title="Hero 04 Demo | Sanu Khan"
        description="Demo route for the HeroSection04 component."
        canonicalPath="/demo/hero-04"
        noindex
      />
      <HeroSection04 />
    </>
  );
}
