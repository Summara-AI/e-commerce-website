import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
  children: React.ReactNode;
  className?: string;
  width?: "content" | "full" | "narrow" | "max" | "form";
  gutters?: boolean;
};

const widthClass = {
  max: "max-w-site",
  content: "max-w-content",
  narrow: "max-w-narrow",
  form: "max-w-form",
  full: "max-w-none",
} as const;

/**
 * Global width + gutter system — reusable across every template.
 */
export function Container({
  as: Tag = "div",
  children,
  className,
  width = "content",
  gutters = true,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        widthClass[width],
        gutters &&
          "px-4 tablet:px-6 laptop:px-8 desktop:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
