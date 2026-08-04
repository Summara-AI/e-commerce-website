/**
 * Server Actions barrel — mutate via Shopify later; validated stubs today.
 */

export {
  addToCartAction,
  updateCartLineAction,
  removeCartLineAction,
  applyDiscountCodesAction,
  updateCartNoteAction,
  type ActionResult,
} from "./cart";

export { syncWishlistAction } from "./wishlist";
export { newsletterSignupAction, type NewsletterSignupActionInput } from "./newsletter";
export { loginAction, logoutAction, getSessionAction, registerAction, recoverAction } from "./auth";
export { contactFormAction } from "./contact";
export { logSearchAction } from "./search";
export {
  updateCustomerProfileAction,
  createCustomerAddressAction,
} from "./customer";
