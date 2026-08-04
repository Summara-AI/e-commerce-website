/**
 * Login page copy + image specs — Brand Kit aligned.
 */

export { LOGIN_COPY } from "@/lib/auth/messages";

export const LOGIN_ROUTES = {
  guest: "/collections/all",
  register: "/account/register",
  recover: "/account/recover",
  success: "/account",
} as const;

export const LOGIN_IMAGE_SPEC = {
  id: "account-login-editorial",
  purpose: "Premium login lifestyle / editorial panel",
  aspect: "4:5",
  desktop: "1100×1375",
  tablet: "900×1125",
  mobile: "800×1000",
  subject:
    "Woman applying skincare or premium bottles in soft natural light — calm beige / marble atmosphere",
  format: "AVIF/WebP",
  compression: "q 72–80; no baked-in text",
} as const;
