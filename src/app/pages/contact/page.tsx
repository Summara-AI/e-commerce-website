import { ContactPageView } from "@/components/pages/ContactPageView";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { CONTACT_PAGE } from "@/content/contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: CONTACT_PAGE.description,
  path: "/pages/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Contact", path: "/pages/contact" }])}
      />
      <ContactPageView />
    </>
  );
}
