import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";
import { BrandIdentity } from "@/components/BrandIdentity";
import { LocaleProvider } from "@/hooks/use-locale";

describe("SanuKhanLogo & BrandIdentity", () => {
  it("renders the combined logo SVG with SK badge and SanuKhan.dev text", () => {
    const { container } = render(<SanuKhanLogo />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-label", "SanuKhan.dev");
    expect(svg).toHaveAttribute("viewBox", "0 0 235 40");
    
    // Check for badge group and text group
    const badge = container.querySelector(".sk-logo__badge");
    expect(badge).not.toBeNull();
    const textGroup = container.querySelector(".sk-logo__text");
    expect(textGroup).not.toBeNull();

    // Check for Sanu (thin), Khan (regular), and .dev (bold gradient)
    expect(container.querySelector(".sk-logo__sanu")).not.toBeNull();
    expect(container.querySelector(".sk-logo__khan")).not.toBeNull();
    expect(container.querySelector(".sk-logo__dev")).not.toBeNull();
  });

  it("renders icon-only variant for compact square badge usage", () => {
    const { container } = render(<SanuKhanLogo showIconOnly />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("viewBox", "0 0 512 512");
  });

  it("renders BrandIdentity in English with logo and descriptor", () => {
    const { container } = render(
      <LocaleProvider initialLocale="en">
        <BrandIdentity />
      </LocaleProvider>
    );

    expect(container.querySelector(".sk-logo-svg")).not.toBeNull();
    expect(container.textContent).toContain("TECH LEAD / SOLUTION EXPERT");
  });

  it("renders BrandIdentity in Arabic with localized descriptor", () => {
    const { container } = render(
      <LocaleProvider initialLocale="ar">
        <BrandIdentity />
      </LocaleProvider>
    );

    expect(container.querySelector(".sk-logo-svg")).not.toBeNull();
    expect(container.textContent).toContain("قائد تقني / خبير حلول");
  });

  it("includes semantic foreground classes and dark-theme gradient stops for theme legibility", () => {
    const { container } = render(<SanuKhanLogo />);
    const sanu = container.querySelector(".sk-logo__sanu");
    const khan = container.querySelector(".sk-logo__khan");
    expect(sanu).toHaveClass("fill-current");
    expect(khan).toHaveClass("fill-current");

    expect(container.querySelector(".sk-logo-grad-stop-0")).not.toBeNull();
    expect(container.querySelector(".sk-logo-grad-stop-50")).not.toBeNull();
    expect(container.querySelector(".sk-logo-grad-stop-100")).not.toBeNull();
  });
});
