import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ZaakiyBrain } from "@/components/ui/ZaakiyBrain";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

describe("ZaakiyBrain", () => {
  it("exposes its conceptual operations-intelligence visual accessibly", () => {
    render(<ZaakiyBrain locale="en" />);

    expect(screen.getByRole("img", { name: /conceptual operations-intelligence/i })).toBeInTheDocument();
    expect(screen.getByText(/Signals → Context → Decisions → Outcomes/i)).toBeInTheDocument();
  });
});
