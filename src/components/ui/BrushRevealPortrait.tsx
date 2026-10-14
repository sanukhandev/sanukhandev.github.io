import { useCallback, useEffect, useRef, useState } from "react";

type BrushRevealPortraitProps = {
  className?: string;
  alt: string;
};

const portraitSrc = "/hero-avatar-cutout.avif";

/**
 * A photograph, not a flattened illustration. A grayscale canvas sits over
 * the original-color photograph; each brush stamp erases part of that canvas,
 * exposing the original pixels without changing the person's appearance.
 * Keyboard focus and touch offer a full-color alternative.
 */
export function BrushRevealPortrait({ className = "", alt }: BrushRevealPortraitProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [fullColor, setFullColor] = useState(false);

  const redrawGrayscale = useCallback(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!img || !canvas || !container || !img.complete || !img.naturalWidth) return;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.filter = "grayscale(1)";
    ctx.drawImage(img, 0, 0, rect.width, rect.height);
    ctx.filter = "none";
    lastPoint.current = null;
    setCanvasReady(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    if (image.complete) redrawGrayscale();
    image.addEventListener("load", redrawGrayscale);
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => redrawGrayscale())
      : null;
    observer?.observe(container);

    return () => {
      image.removeEventListener("load", redrawGrayscale);
      observer?.disconnect();
    };
  }, [redrawGrayscale]);

  const dab = useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    // An irregular, angled paintbrush head rather than a perfect circular
    // spotlight; the scattered bristles reveal the actual image underneath.
    ctx.translate(x, y);
    ctx.rotate(-0.42);
    for (let i = 0; i < 16; i++) {
      const phase = (i * 1.61803398875) % 1;
      const offset = (phase - .5) * 72;
      const length = 20 + (i % 5) * 9;
      const width = 5 + (i % 3) * 3;
      ctx.beginPath();
      ctx.roundRect(-length / 2, offset, length, width, width / 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(0, 0, 23, 38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  const brush = useCallback((clientX: number, clientY: number) => {
    const node = containerRef.current;
    if (!node || !canvasReady) return;
    const rect = node.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    const previous = lastPoint.current;
    const dist = previous ? Math.hypot(x - previous.x, y - previous.y) : 0;
    const steps = previous ? Math.min(80, Math.max(1, Math.ceil(dist / 10))) : 1;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      dab(previous ? previous.x + (x - previous.x) * t : x,
          previous ? previous.y + (y - previous.y) * t : y);
    }
    lastPoint.current = { x, y };
  }, [canvasReady, dab]);

  return (
    <div
      ref={containerRef}
      className={`hero-brush-avatar ${className}`}
      tabIndex={0}
      role="group"
      aria-label="Portrait. Move your pointer over the photograph to paint in its original color, or focus to reveal all color."
      onPointerEnter={(e) => { if (e.pointerType === "mouse" || e.pointerType === "pen") brush(e.clientX, e.clientY); }}
      onPointerMove={(e) => { if (e.pointerType === "mouse" || e.pointerType === "pen") brush(e.clientX, e.clientY); }}
      onPointerLeave={() => { if (!fullColor) redrawGrayscale(); }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          setFullColor(true);
        }
      }}
      onFocus={() => setFullColor(true)}
      onBlur={() => {
        setFullColor(false);
        redrawGrayscale();
      }}
    >
      <img
        ref={imageRef}
        src={portraitSrc}
        alt={alt}
        width={900}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className={`hero-brush-avatar__photo ${canvasReady ? "" : "hero-brush-avatar__fallback"}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`hero-brush-avatar__overlay ${canvasReady && !fullColor ? "hero-brush-avatar__overlay--ready" : ""}`}
      />
    </div>
  );
}
