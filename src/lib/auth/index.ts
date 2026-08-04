/**
 * Auth module — Shopify Customer Account / Storefront login + registration.
 */

export type {
  AuthErrorCode,
  AuthProvider,
  AuthProviderId,
  CustomerSession,
  LoginFailure,
  LoginInput,
  LoginResult,
  LoginSuccess,
  RecoverFailure,
  RecoverInput,
  RecoverResult,
  RecoverSuccess,
  RegisterFailure,
  RegisterInput,
  RegisterResult,
  RegisterSuccess,
} from "./types";

export {
  LOGIN_COPY,
  REGISTER_COPY,
  RECOVER_COPY,
  AUTH_ERROR_MESSAGES,
  authErrorMessage,
} from "./messages";
export { getAuthConfig, getAuthProviderId } from "./config";
export { loginCustomer } from "./login";
export { registerCustomer } from "./register";
export { recoverCustomer } from "./recover";
export {
  PASSWORD_RULES,
  evaluatePassword,
  isStrongPassword,
} from "./password";
export {
  getCustomerSession,
  isAuthenticated,
  setCustomerSession,
  clearCustomerSession,
} from "./session";
export { getAuthProvider } from "./providers";
