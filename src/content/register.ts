/**
 * Register page copy + image specs — Brand Kit aligned.
 */

export { REGISTER_COPY } from "@/lib/auth/messages";
export { LOGIN_ROUTES } from "@/content/login";

export const REGISTER_IMAGE_SPEC = {
  id: "account-register-editorial",
  purpose: "Premium registration lifestyle / editorial panel",
  aspect: "4:5",
  desktop: "1100×1375",
  tablet: "900×1125",
  mobile: "800×1000",
  subject:
    "Woman applying skincare or premium bottles in soft natural light — clean marble / laboratory calm",
  format: "AVIF/WebP",
  compression: "q 72–80; no baked-in text",
} as const;
