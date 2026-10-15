import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrushRevealPortrait } from "@/components/ui/BrushRevealPortrait";

describe("BrushRevealPortrait (Optimized Web Render)", () => {
  it("renders optimized picture element with responsive AVIF and WebP sources", () => {
    const { container } = render(<BrushRevealPortrait alt="Portrait of Sanu Khan" />);
    const picture = container.querySelector("picture");
    expect(picture).not.toBeNull();

    const sources = container.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("type", "image/avif");
    expect(sources[0]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-latest-480.avif 480w"));
    expect(sources[0]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-latest.avif 1122w"));
    expect(sources[1]).toHaveAttribute("type", "image/webp");
    expect(sources[1]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-latest-480.webp 480w"));
    expect(sources[1]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-latest.webp 1122w"));

    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/hero-avatar-latest.webp");
    expect(img).toHaveAttribute("alt", "Portrait of Sanu Khan");
    expect(img).toHaveAttribute("width", "1122");
    expect(img).toHaveAttribute("height", "1402");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("decoding", "async");
    expect(img).toHaveAttribute("fetchpriority", "high");

    // Clean render: No canvas or unneeded overhead
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("marks the portrait as mirrored when the Arabic layout requests it", () => {
    render(<BrushRevealPortrait alt="Portrait of Sanu Khan" mirrored />);
    expect(screen.getByRole("group")).toHaveClass("hero-brush-avatar--mirrored");
  });
});
