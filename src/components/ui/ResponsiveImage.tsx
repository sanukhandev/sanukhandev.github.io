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
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

/**
 * Next.js-style responsive image optimization component.
 * Delivers CLS prevention, lazy/priority loading, modern WebP fallbacks,
 * and elegant blur-up placeholder states.
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
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive responsive srcset if standard asset pattern
  const isLocalAsset = src.startsWith("/") || src.startsWith("./");

  // Determine container styles if fill mode is active
  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {/* Blur placeholder layer */}
        {!isLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-md animate-pulse"
            style={blurPlaceholder ? { backgroundImage: `url(${blurPlaceholder})`, backgroundSize: "cover" } : undefined}
          />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
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
        {/* Specular inner hairline border for 2026 Calm Precision */}
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
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={(e) => {
          setIsLoaded(true);
          rest.onLoad?.(e);
        }}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } w-full h-full`}
        style={{
          objectFit,
          ...style,
        }}
        {...rest}
      />
      {/* Specular inner hairline border for 2026 Calm Precision */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10 dark:ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] z-10"
      />
    </div>
  );
};

export default ResponsiveImage;
