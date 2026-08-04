import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

type ProductIngredientsProps = {
  education: ProductEducation;
  className?: string;
};

/**
 * Ingredient education — hero vs supporting, imagery placeholders.
 */
export function ProductIngredients({ education, className }: ProductIngredientsProps) {
  const { ingredients } = education;
  if (!ingredients.items.length) {
    return (
      <Section
        spacing="default"
        aria-labelledby="pdp-ingredients-heading"
        className={cn("bg-surface-soft", className)}
      >
        <Container width="narrow">
          <SectionHeading
            id="pdp-ingredients-heading"
            eyebrow="Ingredients"
            title="Ingredient story coming into focus"
            description={ingredients.lead}
          />
        </Container>
      </Section>
    );
  }

  const heroes = ingredients.items.filter((i) => i.hero);
  const supporting = ingredients.items.filter((i) => !i.hero);

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-ingredients-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-ingredients"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-ingredients-heading"
          eyebrow="Ingredients"
          title="Inside the formula"
          description={ingredients.lead}
        />

        {heroes.map((item) => (
          <article
            key={item.id}
            className="mt-10 grid gap-8 border-t border-border-subtle pt-10 laptop:mt-12 laptop:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] laptop:items-center laptop:gap-14"
          >
            <div
              className={cn(
                "aspect-[4/5] overflow-hidden rounded-card border border-border-subtle bg-pearl",
                "bg-[linear-gradient(155deg,var(--color-canvas)_0%,var(--color-pink-mist)_50%,var(--color-pearl)_100%)]",
              )}
              role="img"
              aria-label={item.imageAlt}
              data-image-spec="pdp-ingredient-hero"
            />
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.14em] text-power-pink">
                Hero ingredient
              </p>
              <h3 className="mt-3 font-display text-h2 font-light italic tracking-[-0.01em] text-foreground">
                {item.name}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground-secondary">
                {item.benefit}
              </p>
            </div>
          </article>
        ))}

        {supporting.length ? (
          <ul className="mt-12 grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
            {supporting.map((item) => (
              <li key={item.id}>
                <article className="flex h-full flex-col">
                  <div
                    className={cn(
                      "aspect-[5/4] overflow-hidden rounded-card border border-border-subtle bg-pearl",
                      "bg-[linear-gradient(160deg,var(--color-blush),var(--color-pink-mist),var(--color-pearl))]",
                    )}
                    role="img"
                    aria-label={item.imageAlt}
                    data-image-spec="pdp-ingredient-support"
                  />
                  <h3 className="mt-4 font-display text-xl font-light italic text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">
                    {item.benefit}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
