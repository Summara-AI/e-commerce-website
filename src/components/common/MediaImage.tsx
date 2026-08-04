import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaImageProps = {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
  /** IMAGE SPEC name for production assets */
  spec?: string;
  /** Optional LQIP — pass Shopify-derived blur data when available */
  blurDataURL?: string;
};

/**
 * Production media — Next/Image when src exists; editorial placeholder otherwise.
 * Placeholders use Brand Kit blush/mist shimmer — replace with photography via `src`.
 */
export function MediaImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  className,
  aspectClassName,
  spec,
  blurDataURL,
}: MediaImageProps) {
  const blurProps = blurDataURL
    ? ({ placeholder: "blur" as const, blurDataURL } as const)
    : {};

  const placeholder = (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[inherit] bg-blush",
        className,
      )}
      role="img"
      aria-label={alt}
      data-placeholder="true"
      data-image-spec={spec}
    >
      <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(155deg,transparent_0%,rgba(255,245,249,0.55)_40%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-[18%] rounded-[46%] border border-pearl/70 bg-pearl/25"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[14%] left-1/2 h-px w-[28%] -translate-x-1/2 bg-soft-pink/35"
        aria-hidden="true"
      />
    </div>
  );

  if (!src) {
    if (fill) return placeholder;
    return (
      <div
        className={cn("relative overflow-hidden rounded-card bg-blush", aspectClassName)}
        style={width && height ? { width, height } : undefined}
      >
        {placeholder}
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn("object-cover media-fade-in", className)}
        data-image-spec={spec}
        {...blurProps}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={cn("h-auto w-full object-cover media-fade-in", className)}
      data-image-spec={spec}
      {...blurProps}
    />
  );
}
