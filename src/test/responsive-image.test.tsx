import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

describe("ResponsiveImage Derivative Mapping", () => {
  it("does NOT substitute a different asset for named portraits like sanu-khan-editorial-monochrome.webp", () => {
    const { container } = render(
      <ResponsiveImage
        src="/assets/images/sanu-khan-editorial-monochrome.webp"
        alt="Sanu Khan Editorial Portrait"
      />
    );

    const avifSource = container.querySelector("source[type='image/avif']");
    // Must NOT map to generic sanu.avif because they are different images
    expect(avifSource).toBeNull();

    const img = container.querySelector("img");
    expect(img).toBeDefined();
    expect(img?.getAttribute("src")).toBe("/assets/images/sanu-khan-editorial-monochrome.webp");
  });

  it("correctly resolves paired AVIF derivative for exact /assets/images/sanu.webp", () => {
    const { container } = render(
      <ResponsiveImage
        src="/assets/images/sanu.webp"
        alt="Sanu Khan Avatar"
      />
    );

    const avifSource = container.querySelector("source[type='image/avif']");
    expect(avifSource).not.toBeNull();
    expect(avifSource?.getAttribute("srcset")).toBe("/assets/images/sanu.avif");
  });

  it("correctly resolves multi-resolution AVIF and WebP sources for hero-avatar-latest", () => {
    const { container } = render(
      <ResponsiveImage
        src="/hero-avatar-latest.webp"
        alt="Hero Avatar"
      />
    );

    const avifSource = container.querySelector("source[type='image/avif']");
    const webpSource = container.querySelector("source[type='image/webp']");

    expect(avifSource).not.toBeNull();
    expect(avifSource?.getAttribute("srcset")).toContain("hero-avatar-latest-480.avif 480w");
    expect(avifSource?.getAttribute("srcset")).toContain("hero-avatar-latest-720.avif 720w");

    expect(webpSource).not.toBeNull();
    expect(webpSource?.getAttribute("srcset")).toContain("hero-avatar-latest-480.webp 480w");
    expect(webpSource?.getAttribute("srcset")).toContain("hero-avatar-latest-720.webp 720w");
  });

  it("correctly resolves multi-resolution cutout sources for hero-avatar-cutout", () => {
    const { container } = render(
      <ResponsiveImage
        src="/hero-avatar-cutout-360.avif"
        alt="Hero Cutout"
      />
    );

    const avifSource = container.querySelector("source[type='image/avif']");
    expect(avifSource).not.toBeNull();
    expect(avifSource?.getAttribute("srcset")).toContain("/hero-avatar-cutout-360.avif 360w");
    expect(avifSource?.getAttribute("srcset")).toContain("/hero-avatar-cutout-720.avif 720w");
  });
});
