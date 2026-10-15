type BrushRevealPortraitProps = {
  className?: string;
  alt: string;
  ariaLabel?: string;
  mirrored?: boolean;
};

const avifSrcSet =
  "/hero-avatar-latest-480.avif 480w, /hero-avatar-latest-720.avif 720w, /hero-avatar-latest.avif 1122w";
const webpSrcSet =
  "/hero-avatar-latest-480.webp 480w, /hero-avatar-latest-720.webp 720w, /hero-avatar-latest.webp 1122w";
const portraitSizes =
  "(max-width: 767px) min(100vw, 480px), (max-width: 1050px) 720px, 1122px";

/**
 * BrushRevealPortrait — Optimized web-render avatar portrait.
 *
 * Renders the clean, full-color responsive photograph via modern AVIF and WebP
 * sources without pointer tracking, runtime canvas redraws, or brush masking.
 */
export function BrushRevealPortrait({
  className = "",
  alt,
  ariaLabel,
  mirrored = false,
}: BrushRevealPortraitProps) {
  return (
    <div
      className={`hero-brush-avatar ${mirrored ? "hero-brush-avatar--mirrored" : ""} ${className}`}
      role="group"
      aria-label={ariaLabel ?? alt}
    >
      <picture className="hero-brush-avatar__picture">
        <source
          type="image/avif"
          srcSet={avifSrcSet}
          sizes={portraitSizes}
        />
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={portraitSizes}
        />
        <img
          src="/hero-avatar-latest.webp"
          alt={alt}
          width={1122}
          height={1402}
          loading="eager"
          decoding="async"
          className="hero-brush-avatar__photo"
          ref={(element) => element?.setAttribute("fetchpriority", "high")}
        />
      </picture>
    </div>
  );
}
