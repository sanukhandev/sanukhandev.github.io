import { describe, expect, it } from "vitest";
import { siteContent } from "@/data/siteContent";
import { pageSeoAr } from "@/lib/seo";

describe("Arabic Localization Integrity Tests", () => {
  it("should have valid ar locale content structure", () => {
    expect(siteContent.ar).toBeDefined();
    expect(siteContent.ar.profile).toBeDefined();
    expect(siteContent.ar.nav).toBeDefined();
    expect(siteContent.ar.services).toBeDefined();
    expect(siteContent.ar.works).toBeDefined();
    expect(siteContent.ar.articles).toBeDefined();
    expect(siteContent.ar.footer).toBeDefined();
  });

  it("should contain localized profile and identity", () => {
    const { profile } = siteContent.ar;
    expect(profile.name).toBe("سانو خان");
    expect(profile.role).toBe("معماري تقني · قائد هندسي");
    expect(profile.meta.length).toBeGreaterThan(0);
  });

  it("should contain localized navigation items", () => {
    const { nav } = siteContent.ar;
    expect(nav.links.length).toBeGreaterThan(0);
    const labels = nav.links.map((item) => item.label);
    expect(labels).toContain("الخدمات");
    expect(labels).toContain("الأعمال");
  });

  it("should contain localized production works data", () => {
    const { works } = siteContent.ar;
    expect(works.length).toBeGreaterThan(0);
    expect(works[0].title).toBeDefined();
    expect(works[0].solution).toBeDefined();
  });

  it("should contain localized services with architecture impact", () => {
    const { services } = siteContent.ar;
    expect(services.length).toBeGreaterThan(0);
    expect(services[0].role).toBeDefined();
    expect(services[0].impact.length).toBeGreaterThan(0);
  });

  it("should contain localized technical articles and categories", () => {
    const { articles } = siteContent.ar;
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].title).toBeDefined();
  });

  it("should contain localized footer and contact information", () => {
    const { footer } = siteContent.ar;
    expect(footer.brand).toBe("سانوخان.ديف");
    expect(footer.contact.location).toBe("دبي، الإمارات");
    expect(footer.contact.cta.label).toBe("لنتحدث");
    expect(footer.copyright).toContain("سانو خان");
  });

  it("should contain localized skills clusters", () => {
    const { skills } = siteContent.ar;
    expect(skills.clusters.length).toBeGreaterThan(0);
  });

  it("should have parity between English and Arabic content keys", () => {
    const enKeys = Object.keys(siteContent.en).sort();
    const arKeys = Object.keys(siteContent.ar).sort();
    expect(arKeys).toEqual(enKeys);
  });

  it("should contain localized SEO metadata for all main routes", () => {
    expect(pageSeoAr.home.title).toContain("Sanu Khan");
    expect(pageSeoAr.home.description).toContain("خبير تقني");
    expect(pageSeoAr.blogIndex.title).toBeDefined();
    expect(pageSeoAr.projects.title).toBeDefined();
    expect(pageSeoAr.about.title).toBeDefined();
    expect(pageSeoAr.contact.title).toBeDefined();
    expect(pageSeoAr.faq.title).toBeDefined();
  });
});
