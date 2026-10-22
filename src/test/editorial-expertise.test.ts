import { describe, expect, it } from "vitest";
import { expertiseAreas } from "@/data/expertise";

describe("Bilingual editorial expertise", () => {
  it("contains every defined area once with working internal route targets", () => {
    expect(expertiseAreas).toHaveLength(7);
    expect(new Set(expertiseAreas.map((item) => item.id)).size).toBe(7);
    for (const item of expertiseAreas) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href.slice(1)).toMatch(/^[a-z-]+$/);
      expect(item.number).toMatch(/^0[1-7]$/);
    }
  });

  it("has meaningful content and two role labels in both locales", () => {
    for (const item of expertiseAreas) {
      for (const lang of ["en", "ar"] as const) {
        expect(item.title[lang].length).toBeGreaterThan(6);
        expect(item.description[lang].length).toBeGreaterThan(45);
        expect(item.specialties[lang]).toHaveLength(2);
        expect(item.specialties[lang].every(Boolean)).toBe(true);
      }
    }
  });
});
