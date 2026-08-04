import { redirect } from "next/navigation";
import { LoginPageView } from "@/components/auth/LoginPageView";
import { isAuthenticated } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sign In",
  description:
    "Sign in to Korean Skin Lab — view orders, wishlist, saved addresses, and enjoy faster checkout.",
  path: "/account/login",
  noIndex: true,
});

/**
 * Premium customer login — redirects to /account when already authenticated.
 */
export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/account");
  }

  return <LoginPageView />;
}
