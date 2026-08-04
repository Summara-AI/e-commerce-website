import { MediaImage } from "@/components/common/MediaImage";
import { cn } from "@/lib/utils";

type EditorialMediaProps = {
  /** Matches pages-assets IMAGE SPEC name */
  spec: string;
  label: string;
  aspect?: "3/4" | "4/5" | "16/9" | "1/1";
  className?: string;
  /** Shopify CDN / Files URL when available */
  src?: string | null;
  priority?: boolean;
};

const aspectClass = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
} as const;

/**
 * Soft Brand Kit media plane — Next/Image ready with production placeholders.
 */
export function EditorialMedia({
  spec,
  label,
  aspect = "3/4",
  className,
  src,
  priority = false,
}: EditorialMediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-border-subtle bg-blush media-fade-in",
        aspectClass[aspect],
        className,
      )}
      data-image-spec={spec}
    >
      <MediaImage
        src={src}
        alt={label}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
        spec={spec}
      />
    </div>
  );
}
