import { cn } from "@/lib/utils";

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end" | "between";
  stackedOnMobile?: boolean;
};

export function ButtonGroup({
  children,
  className,
  align = "start",
  stackedOnMobile = true,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        stackedOnMobile && "flex-col tablet:flex-row",
        !stackedOnMobile && "flex-row flex-wrap",
        align === "start" && "justify-start",
        align === "center" && "items-center justify-center",
        align === "end" && "justify-end",
        align === "between" && "justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}
