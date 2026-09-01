import { describe, expect, it } from "vitest";
import { siteContent } from "@/data/siteContent";
import { pageSeoAr } from "@/lib/seo";

describe("Arabic Localization Integrity Tests", () => {
  it("should have valid ar locale content structure", () => {
    expect(siteContent.ar).toBeDefined();
    expect(siteContent.ar.ui).toBeDefined();
  });

  it("should contain localized hero UI strings", () => {
    const { hero } = siteContent.ar.ui;
    expect(hero.eyebrow).toBe("معماري تقني · قائد هندسي");
    expect(hero.headline).toContain("أصمم وأبني منصات");
    expect(hero.exploreWork).toBe("استعرض أعمالي");
    expect(hero.viewArchitecture).toBe("استعرض المعمارية");
    expect(hero.credibilityLine.length).toBeGreaterThan(0);
  });

  it("should contain localized production systems data", () => {
    const { works } = siteContent.ar.ui;
    expect(works.eyebrow).toBe("منصات إنتاجية مختارة");
    expect(works.myContributionLabel).toBe("مساهمتي");
    expect(works.viewProject).toBe("عرض المشروع");
    expect(works.systemsData.length).toBe(4);
    expect(works.systemsData[0].title).toBe("منصة تجارة إقليمية للمؤسسات");
  });

  it("should contain localized architecture case study data", () => {
    const { architecture } = siteContent.ar.ui;
    expect(architecture.eyebrow).toBe("دراسة حالة معمارية");
    expect(architecture.challengeLabel).toBe("التحدي");
    expect(architecture.topologyLabel).toBe("مخطط المعمارية الهندسية");
    expect(architecture.keyDecisionsLabel).toBe("القرارات المعمارية الرئيسية");
    expect(architecture.whyArchitectureLabel).toBe("لماذا هذه المعمارية؟");
    expect(architecture.keyDecisions.length).toBe(5);
  });

  it("should contain localized domains data", () => {
    const { whatIArchitect } = siteContent.ar.ui;
    expect(whatIArchitect.eyebrow).toBe("مجالات الهندسة");
    expect(whatIArchitect.domainsData.length).toBe(4);
    expect(whatIArchitect.domainsData[0].title).toBe("هندسة المنصات");
  });

  it("should contain localized Zaakiy personal R&D data", () => {
    const { zaakiy } = siteContent.ar.ui;
    expect(zaakiy.eyebrow).toBe("بحث وتطوير شخصي");
    expect(zaakiy.exploreLink).toBe("استكشف Zaakiy");
    expect(zaakiy.flowNodes.length).toBe(5);
    expect(zaakiy.exploringItems.length).toBe(6);
  });

  it("should contain localized engineering notes data", () => {
    const { engineeringNotes } = siteContent.ar.ui;
    expect(engineeringNotes.eyebrow).toBe("ملاحظات هندسية");
    expect(engineeringNotes.readArticle).toBe("قراءة المقال");
    expect(engineeringNotes.viewAll).toContain("عرض جميع الملاحظات الهندسية");
    expect(siteContent.ar.articles.length).toBeGreaterThan(0);
  });

  it("should contain localized beyond architecture data", () => {
    const { beyondArchitecture } = siteContent.ar.ui;
    expect(beyondArchitecture.eyebrow).toBe("ما بعد مخطط المعمارية");
    expect(beyondArchitecture.processFlow.length).toBe(6);
    expect(beyondArchitecture.leadershipItems.length).toBe(4);
  });

  it("should contain localized footer CTA data", () => {
    const { footer } = siteContent.ar.ui;
    expect(footer.ctaHeading).toContain("تحديات هندسية معقدة");
    expect(footer.ctaButton).toBe("لنتحدث");
  });

  it("should contain localized SEO metadata for all main routes", () => {
    expect(pageSeoAr.home.title).toContain("Sanu Khan");
    expect(pageSeoAr.home.description).toContain("معماري تقني");
    expect(pageSeoAr.blogIndex.title).toBeDefined();
    expect(pageSeoAr.projects.title).toBeDefined();
    expect(pageSeoAr.about.title).toBeDefined();
    expect(pageSeoAr.contact.title).toBeDefined();
    expect(pageSeoAr.faq.title).toBeDefined();
  });
});
