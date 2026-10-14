import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type BrushRevealPortraitProps = {
  className?: string;
  alt: string;
};

type BrushPoint = { x: number; y: number };
const portraitSrc = "/hero-avatar-cutout.avif";

/**
 * Two identical image layers guarantee pixel-perfect registration at every
 * viewport. The full-color layer is exposed with overlapping soft-edged,
 * slightly irregular CSS mask stamps. Framer Motion fades the reveal layer.
 *
 * No canvas redraw, bitmap stretching, or new animation dependency.
 */
export function BrushRevealPortrait({ className = "", alt }: BrushRevealPortraitProps) {
  const reducedMotion = useReducedMotion();
  const pointsRef = useRef<BrushPoint[]>([]);
  const [mask, setMask] = useState<string>("");
  const [expanded, setExpanded] = useState(false);

  const paint = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const previous = pointsRef.current.at(-1);
    const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : Infinity;
    if (distance < 13) return;

    // Interpolate long pointer jumps so a quick gesture stays brush-like.
    const stamps = previous ? Math.min(15, Math.ceil(distance / 22)) : 1;
    const added = Array.from({ length: stamps }, (_, index) => {
      const t = (index + 1) / stamps;
      return {
        x: previous ? previous.x + (x - previous.x) * t : x,
        y: previous ? previous.y + (y - previous.y) * t : y,
      };
    });
    pointsRef.current = [...pointsRef.current, ...added].slice(-65);

    const gradients = pointsRef.current.flatMap((point) => {
      const px = point.x.toFixed(1);
      const py = point.y.toFixed(1);
      return [
        `radial-gradient(ellipse 43px 54px at ${px}px ${py}px, #000 0%, #000 54%, transparent 100%)`,
        `radial-gradient(ellipse 8px 31px at ${(point.x - 17).toFixed(1)}px ${(point.y + 5).toFixed(1)}px, #000 0%, transparent 100%)`,
      ];
    });
    setMask(gradients.join(", "));
  }, []);

  const reset = useCallback(() => {
    pointsRef.current = [];
    setMask("");
    setExpanded(false);
  }, []);

  const reveal = expanded ? "none" : mask || "linear-gradient(transparent, transparent)";
  const visible = expanded || mask.length > 0;

  return (
    <div
      className={`hero-brush-avatar ${className}`}
      tabIndex={0}
      role="group"
      aria-label="Portrait. Move your pointer to paint in the original colors, or focus with the keyboard to reveal the full-color image."
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
          paint(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
        }
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
          paint(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
        }
      }}
      onPointerLeave={reset}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setExpanded(true);
      }}
      onFocus={() => setExpanded(true)}
      onBlur={reset}
    >
      <img
        src={portraitSrc}
        alt={alt}
        width={900}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="hero-brush-avatar__photo"
      />
      <motion.img
        src={portraitSrc}
        alt=""
        aria-hidden="true"
        width={900}
        height={1200}
        draggable={false}
        decoding="async"
        className="hero-brush-avatar__color"
        style={{
          maskImage: reveal,
          WebkitMaskImage: reveal,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskComposite: "add",
        }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
      />
    </div>
  );
}
