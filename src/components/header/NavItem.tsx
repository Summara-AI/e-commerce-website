import Link from "next/link";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

/** Single top-level nav control — Poppins uppercase + animated underline */
export function NavItem({ href, label, active, className, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex min-h-11 items-center px-3 font-sans text-sm font-normal uppercase tracking-[0.12em]",
        "text-foreground-nav transition-colors duration-200 ease-out rounded-sm",
        "after:pointer-events-none after:absolute after:bottom-2.5 after:left-3 after:right-3 after:h-px",
        "after:origin-left after:scale-x-0 after:bg-power-pink after:transition-transform after:duration-200 after:ease-out",
        "hover:text-power-pink hover:after:scale-x-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "motion-reduce:after:transition-none",
        active && "text-power-pink after:scale-x-100",
        className,
      )}
    >
      {label}
    </Link>
  );
}
