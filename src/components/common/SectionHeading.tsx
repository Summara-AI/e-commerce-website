import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  size?: "default" | "large";
};

/**
 * Editorial section heading — luxurious hierarchy, calm measure.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
  id,
  size = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "font-display font-light italic tracking-[-0.015em] text-foreground",
          size === "large" ? "text-h1" : "text-h2",
          eyebrow ? "mt-3.5 tablet:mt-4" : undefined,
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-[36rem] font-sans text-sm font-light leading-[1.75] text-foreground-secondary tablet:mt-6 tablet:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
