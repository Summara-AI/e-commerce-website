import { redirect } from "next/navigation";
import { RegisterPageView } from "@/components/auth/RegisterPageView";
import { isAuthenticated } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Create Account",
  description:
    "Create your Korean Skin Lab account — save favourites, track orders, and enjoy faster checkout.",
  path: "/account/register",
  noIndex: true,
});

/**
 * Premium customer registration — redirects to /account when already authenticated.
 */
export default async function RegisterPage() {
  if (await isAuthenticated()) {
    redirect("/account");
  }

  return <RegisterPageView />;
}
