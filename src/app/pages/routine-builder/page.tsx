import { RoutineBuilderView } from "@/components/pages/RoutineBuilderView";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { ROUTINE_BUILDER_PAGE } from "@/content/routine-builder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Routine Builder",
  description: ROUTINE_BUILDER_PAGE.description,
  path: "/pages/routine-builder",
});

export default function RoutineBuilderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Routine Builder", path: "/pages/routine-builder" },
        ])}
      />
      <RoutineBuilderView />
    </>
  );
}
