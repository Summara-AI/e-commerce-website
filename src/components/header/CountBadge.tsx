import { cn } from "@/lib/utils";

type CountBadgeProps = {
  count: number;
  className?: string;
};

export function CountBadge({ count, className }: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute right-1.5 top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full",
        "bg-power-pink px-1 text-[10px] font-medium leading-none text-foreground-on-primary",
        className,
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
