import { MaintenancePageView } from "@/components/pages/MaintenancePageView";
import { MAINTENANCE_PAGE } from "@/content/utility-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Maintenance",
  description: MAINTENANCE_PAGE.description,
  path: "/pages/maintenance",
  noIndex: true,
});

export default function MaintenancePage() {
  return <MaintenancePageView />;
}
