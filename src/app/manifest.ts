import type { MetadataRoute } from "next";
import { SITE_SETTINGS } from "@/data/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_SETTINGS.name} — ${SITE_SETTINGS.tagline}`,
    short_name: SITE_SETTINGS.name,
    description: SITE_SETTINGS.description,
    start_url: "/",
    display: "standalone",
    background_color: "#EFE8E0",
    theme_color: "#E4136F",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
