import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  variant?: "network" | "server" | "form" | "unknown" | "offline";
  /** Heading level — utility pages use h1; inline alerts use h3 (default) */
  titleAs?: "h1" | "h2" | "h3";
  titleId?: string;
};

const COPY: Record<NonNullable<ErrorStateProps["variant"]>, { title: string; description: string }> = {
  network: {
    title: "Connection issue",
    description: "Please check your network and try again.",
  },
  offline: {
    title: "You’re offline",
    description: "Reconnect to continue shopping. Your bag will wait for you.",
  },
  server: {
    title: "Something went wrong on our side",
    description: "We’re working on it. Please try again in a moment.",
  },
  form: {
    title: "Please review your details",
    description: "Some fields need attention before we can continue.",
  },
  unknown: {
    title: "Unexpected error",
    description: "Please try again. If it continues, contact support.",
  },
};

export function ErrorState({
  title,
  description,
  onRetry,
  className,
  variant = "unknown",
  titleAs = "h3",
  titleId,
}: ErrorStateProps) {
  const copy = COPY[variant];
  const TitleTag = titleAs;

  return (
    <div
      role="alert"
      className={cn(
        "rounded-card border border-border-subtle bg-destructive-bg/40 px-5 py-6 text-left",
        className,
      )}
    >
      <TitleTag id={titleId} className="font-display text-xl font-light text-foreground">
        {title ?? copy.title}
      </TitleTag>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        {description ?? copy.description}
      </p>
      {onRetry ? (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <p className="text-caption text-destructive" role="alert">
      {message}
    </p>
  );
}
