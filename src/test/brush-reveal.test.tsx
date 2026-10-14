import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrushRevealPortrait } from "@/components/ui/BrushRevealPortrait";

describe("BrushRevealPortrait", () => {
  it("keeps both image layers registered to the same actual photograph", () => {
    const { container } = render(<BrushRevealPortrait alt="Portrait of Sanu Khan" />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/hero-avatar-cutout.avif");
    expect(images[1]).not.toHaveAttribute("src");
    expect(images[0]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-cutout-360.avif 360w"));
    expect(images[1]).not.toHaveAttribute("srcset");
    expect(images[0]).toHaveAttribute("alt", "Portrait of Sanu Khan");
    expect(images[1]).toHaveAttribute("aria-hidden", "true");
    fireEvent.focus(screen.getByRole("group"));
    expect(images[1]).toHaveAttribute("src", "/hero-avatar-cutout.avif");
    expect(images[1]).toHaveAttribute("srcset", expect.stringContaining("/hero-avatar-cutout-720.avif 720w"));
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("offers a keyboard full-color reveal without pointer input", () => {
    render(<BrushRevealPortrait alt="Portrait of Sanu Khan" />);
    const portrait = screen.getByRole("group");
    const layers = portrait.querySelectorAll("img");
    fireEvent.focus(portrait);
    expect(layers[1].style.maskImage).toBe("none");
    fireEvent.blur(portrait);
    expect(layers[1].style.maskImage).toContain("linear-gradient");
  });

  it("marks the portrait as mirrored when the Arabic layout requests it", () => {
    render(<BrushRevealPortrait alt="Portrait of Sanu Khan" mirrored />);
    expect(screen.getByRole("group")).toHaveClass("hero-brush-avatar--mirrored");
  });
});
