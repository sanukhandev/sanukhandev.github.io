import { Button } from "@/components/ui/button";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";

const ITEMS = [
  { title: "Architecture", detail: "Distributed systems" },
  { title: "Commerce", detail: "Event-driven delivery" },
  { title: "Integration", detail: "SAP + Shopify + Kibo" },
  { title: "Platform", detail: "Cloud-native operations" },
];

export const CtaSectionWithGalleryDemo = () => {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-accent md:text-sm">
            Innovate & Grow
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-semibold tracking-tight text-primary md:text-[2.4rem]">
            Scale Your Business Through Innovation
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-secondary md:my-6 md:text-lg">
            Transform your startup potential through innovative solutions and
            strategic growth.
          </ContainerAnimated>
          <ContainerAnimated>
            <Button className="bg-accent text-on-accent hover:bg-accent/90">
              Start Scaling Today
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {ITEMS.map((item, index) => (
            <GalleryGridCell
              index={index}
              key={item.title}
              className="border border-default/70 bg-gradient-to-br from-secondary via-background to-secondary/60 p-4"
            >
              <div className="flex h-full flex-col justify-end">
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <p className="text-xs text-secondary">{item.detail}</p>
              </div>
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
};
