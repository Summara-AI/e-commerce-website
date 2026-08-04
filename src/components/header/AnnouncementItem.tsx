import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/lib/navigation";

type AnnouncementItemProps = {
  item: Announcement;
  className?: string;
};

export function AnnouncementItem({ item, className }: AnnouncementItemProps) {
  const external = Boolean(item.href?.startsWith("http"));

  return (
    <p
      className={cn(
        "inline max-w-[52rem] text-center text-caption font-medium leading-snug tracking-[0.02em]",
        "line-clamp-2 tablet:line-clamp-1",
        "tablet:text-overline tablet:uppercase tablet:tracking-[0.08em]",
        className,
      )}
    >
      <span>{item.message}</span>
      {item.href ? (
        <>
          <span className="mx-2 opacity-55" aria-hidden="true">
            ·
          </span>
          <Link
            href={item.href}
            className="font-medium underline underline-offset-[0.2em] decoration-1 transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {item.linkLabel ?? "Learn more"}
          </Link>
        </>
      ) : null}
    </p>
  );
}
