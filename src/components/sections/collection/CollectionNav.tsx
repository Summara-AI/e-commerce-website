import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getCollectionMetaByHandle } from "@/lib/collections";
import { cn } from "@/lib/utils";

type CollectionNavProps = {
  currentHandle: string;
  switcherHandles: string[];
  className?: string;
};

/**
 * Collection navigation — back to shop + sibling collection switching.
 */
export function CollectionNav({
  currentHandle,
  switcherHandles,
  className,
}: CollectionNavProps) {
  const siblings = switcherHandles
    .map((handle) => getCollectionMetaByHandle(handle))
    .filter(Boolean);

  return (
    <div className={cn("border-y border-border-subtle bg-page", className)}>
      <Container width="content" className="py-4 tablet:py-5">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Back to Shop
          </Link>

          {siblings.length > 1 ? (
            <nav aria-label="Related collections" className="min-w-0">
              <ul className="-mx-1 flex gap-1 overflow-x-auto overscroll-x-contain scroll-px-1 px-1 pb-1 [-webkit-overflow-scrolling:touch]">
                {siblings.map((collection) => {
                  if (!collection) return null;
                  const active = collection.handle === currentHandle;
                  return (
                    <li key={collection.id} className="shrink-0">
                      <Link
                        href={collection.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium transition-colors",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                          active
                            ? "bg-power-pink text-foreground-on-primary"
                            : "text-foreground-secondary hover:bg-surface-soft hover:text-foreground",
                        )}
                      >
                        {collection.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
