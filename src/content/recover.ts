/**
 * Recover page copy + image specs — Brand Kit aligned.
 */

export { RECOVER_COPY } from "@/lib/auth/messages";
export { LOGIN_ROUTES } from "@/content/login";

export const RECOVER_IMAGE_SPEC = {
  id: "account-recover-editorial",
  purpose: "Premium password recovery lifestyle / editorial panel",
  aspect: "4:5",
  desktop: "1100×1375",
  tablet: "900×1125",
  mobile: "800×1000",
  subject:
    "Soft skincare textures, cream products, or calm laboratory light — reassuring and quiet",
  format: "AVIF/WebP",
  compression: "q 72–80; no baked-in text",
} as const;

/** Resend cooldown in seconds */
export const RECOVER_RESEND_COOLDOWN = 60;
