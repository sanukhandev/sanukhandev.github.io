import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";

describe("ErrorBoundary and lazyWithRetry unit tests", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    sessionStorage.clear();
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { ...originalLocation, reload: vi.fn(), pathname: "/" };
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.restoreAllMocks();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Normal Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Normal Component")).toBeInTheDocument();
  });

  it("renders chunk load error fallback when ErrorBoundary catches ChunkLoadError", () => {
    const ProblematicComponent = () => {
      const error = new Error("Failed to fetch dynamically imported module: https://www.sanukhan.dev/assets/BlogIndex-C57tKYbe.js");
      error.name = "ChunkLoadError";
      throw error;
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Application Updated")).toBeInTheDocument();
    expect(
      screen.getByText(/A new version of the website is available/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reload Page/i })).toBeInTheDocument();

    spy.mockRestore();
  });

  it("renders Navbar component with nav links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Zaakiy")).toBeInTheDocument();
    expect(screen.getByText("Writing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
