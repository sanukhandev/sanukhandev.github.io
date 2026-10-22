import React, { useState } from "react";

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  blurPlaceholder?: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

/**
 * Responsive image component with CLS layout stabilization, lazy/priority loading, and responsive sizes.
 * - Multi-resolution AVIF & WebP source sets are resolved for portrait & avatar imagery.
 * - Single-raster editorial assets (such as conceptual architecture diagrams) are rendered with
 *   asynchronous decoding, aspect-ratio containment, and adaptive viewport sizes.
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  objectFit = "cover",
  blurPlaceholder,
  avifSrcSet,
  webpSrcSet,
  sizes,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-resolve known AVIF and WebP responsive derivatives for portrait and avatar assets
  let resolvedAvifSrcSet = avifSrcSet;
  let resolvedWebpSrcSet = webpSrcSet;

  if (!resolvedAvifSrcSet) {
    if (src.includes("hero-avatar-latest") || src.includes("avatar_latest")) {
      resolvedAvifSrcSet = "/hero-avatar-latest-480.avif 480w, /hero-avatar-latest-720.avif 720w, /hero-avatar-latest.avif 1080w";
    } else if (src.includes("hero-avatar") || src.includes("sanu-hero-cutout")) {
      resolvedAvifSrcSet = "/hero-avatar-cutout-360.avif 360w, /hero-avatar-cutout-720.avif 720w, /hero-avatar-cutout.avif 1080w";
    } else if (src === "/assets/images/sanu.webp") {
      resolvedAvifSrcSet = "/assets/images/sanu.avif";
    }
  }

  if (!resolvedWebpSrcSet) {
    if (src.includes("hero-avatar-latest") || src.includes("avatar_latest")) {
      resolvedWebpSrcSet = "/hero-avatar-latest-480.webp 480w, /hero-avatar-latest-720.webp 720w, /hero-avatar-latest.webp 1080w";
    } else if (src.includes("hero-avatar-cutout") || src.includes("sanu-hero-cutout")) {
      resolvedWebpSrcSet = "/assets/images/sanu-hero-cutout.webp 720w";
    } else if (src === "/assets/images/sanu.avif") {
      resolvedWebpSrcSet = "/assets/images/sanu.webp";
    }
  }

  const resolvedSizes = sizes || (fill ? "100vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw");

  const imageElement = (
    <picture className="w-full h-full block">
      {resolvedAvifSrcSet && (
        <source type="image/avif" srcSet={resolvedAvifSrcSet} sizes={resolvedSizes} />
      )}
      {resolvedWebpSrcSet && (
        <source type="image/webp" srcSet={resolvedWebpSrcSet} sizes={resolvedSizes} />
      )}
      <img
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        sizes={resolvedSizes}
        onLoad={(e) => {
          setIsLoaded(true);
          rest.onLoad?.(e);
        }}
        className={`w-full h-full transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          objectFit,
          ...style,
        }}
        {...rest}
      />
    </picture>
  );

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {!isLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-md animate-pulse"
            style={blurPlaceholder ? { backgroundImage: `url(${blurPlaceholder})`, backgroundSize: "cover" } : undefined}
          />
        )}
        {imageElement}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10 dark:ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] z-10"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm animate-pulse"
        />
      )}
      {imageElement}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10 dark:ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] z-10"
      />
    </div>
  );
};

export default ResponsiveImage;
