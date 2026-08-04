import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card skeleton-shimmer motion-reduce:animate-none motion-reduce:bg-blush",
        className,
      )}
      {...props}
    />
  );
}
