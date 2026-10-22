import { describe, it, expect } from "vitest";
import { SERVER_TRUSTED_PORTFOLIO_FACTS } from "../../api/zaakiy-chat";
import { flagshipCaseStudies } from "@/data/caseStudies";
import enLocale from "@/locales/en.json";
import arLocale from "@/locales/ar.json";
import { articles as siteArticles } from "@/data/siteData";

describe("Zaakiy Facts & Ground Truth Alignment", () => {
  describe("Healthcare Case Study Canonical Alignment (No Unsupported Claims)", () => {
    it("ensures English healthcare facts align with Next.js + WordPress headless architecture", () => {
      const enFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.en.join("\n");

      // Must be present and grounded in canonical case study
      expect(enFacts).toContain("headless-healthcare-digital-experience");
      expect(enFacts).toContain("Next.js frontend with WordPress and ACF as structured headless CMS");
      expect(enFacts).toContain("WPGraphQL operations");

      // Must NOT contain unsupported claims flagged in P1
      expect(enFacts).not.toContain("telemedicine");
      expect(enFacts).not.toContain("patient portal");
      expect(enFacts).not.toContain("HL7/FHIR");
      expect(enFacts).not.toContain("HIPAA/GDPR data isolation");
      expect(enFacts).not.toContain("sub-100ms slot search");
    });

    it("ensures Arabic healthcare facts align with Next.js + WordPress headless architecture", () => {
      const arFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.ar.join("\n");

      expect(arFacts).toContain("headless-healthcare-digital-experience");
      expect(arFacts).toContain("WordPress وACF كنظام CMS منظم ومفصول");
      expect(arFacts).toContain("WPGraphQL");

      // Must NOT contain unsupported claims in Arabic
      expect(arFacts).not.toContain("بوابة مرضى");
      expect(arFacts).not.toContain("استشارات عن بعد");
      expect(arFacts).not.toContain("HL7/FHIR");
      expect(arFacts).not.toContain("HIPAA/GDPR");
    });

    it("verifies the slug exists in flagshipCaseStudies", () => {
      const healthcare = flagshipCaseStudies.find(
        (cs) => cs.slug === "headless-healthcare-digital-experience"
      );
      expect(healthcare).toBeDefined();
      expect(healthcare?.systemsInvolved).toContain("WordPress");
      expect(healthcare?.systemsInvolved).toContain("WPGraphQL");
      expect(healthcare?.systemsInvolved).toContain("Next.js");
    });
  });

  describe("Published Article URLs Consistency", () => {
    it("references canonical DuckDB article slug ending in -579m (not stale -3n6d)", () => {
      const enFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.en.join("\n");
      const arFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.ar.join("\n");

      const canonicalDuckDbSlug = enLocale.writing.articles.find((a) =>
        a.title.toLowerCase().includes("duckdb")
      )?.slug;

      expect(canonicalDuckDbSlug).toBe("duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m");

      // Verify EN facts use canonical slug and do not contain stale slug
      expect(enFacts).toContain("/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m");
      expect(enFacts).not.toContain("3n6d");

      // Verify AR facts use canonical slug and do not contain stale slug
      expect(arFacts).toContain("/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m");
      expect(arFacts).not.toContain("3n6d");
    });

    it("ensures all published article links in assistant facts map to real site articles", () => {
      const enFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.en;
      const articleFacts = enFacts.filter((f) => f.startsWith("Article:"));

      const canonicalUrls = new Set([
        ...enLocale.writing.articles.map((a) => `/blog/${a.slug}`),
        ...arLocale.writing.articles.map((a) => `/blog/${a.slug}`),
        ...siteArticles.map((a) => a.url),
      ]);

      articleFacts.forEach((fact) => {
        const urlMatch = fact.match(/\/blog\/[a-z0-9-]+/i);
        expect(urlMatch).not.toBeNull();
        if (urlMatch) {
          expect(canonicalUrls.has(urlMatch[0])).toBe(true);
        }
      });
    });
  });

  describe("All 7 Flagship Production Systems Alignment", () => {
    const requiredSlugs = [
      "real-estate-erp-architecture",
      "garage-management-and-diagnostics",
      "headless-healthcare-digital-experience",
      "enterprise-retail-integration",
      "airline-retailing-aggregation",
      "automotive-omnichannel-platform",
      "zaakiy-v3rse",
    ];

    it.each(requiredSlugs)("verifies slug %s is present in both facts and case studies", (slug) => {
      const enFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.en.join("\n");
      const arFacts = SERVER_TRUSTED_PORTFOLIO_FACTS.ar.join("\n");

      expect(enFacts).toContain(slug);
      expect(arFacts).toContain(slug);

      const existsInCaseStudies = flagshipCaseStudies.some((cs) => cs.slug === slug);
      expect(existsInCaseStudies).toBe(true);
    });
  });
});
