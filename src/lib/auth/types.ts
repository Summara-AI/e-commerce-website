/**
 * Customer auth — Shopify Customer Account / Storefront contract.
 * Login + registration share session + provider surface.
 */

export type AuthProviderId = "local" | "shopify_storefront";

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "ACCOUNT_NOT_FOUND"
  | "INCORRECT_PASSWORD"
  | "TOO_MANY_ATTEMPTS"
  | "SERVER_UNAVAILABLE"
  | "NETWORK"
  | "VALIDATION"
  | "EMAIL_EXISTS"
  | "WEAK_PASSWORD"
  | "PASSWORD_MISMATCH"
  | "TERMS_REQUIRED"
  | "UNKNOWN";

export type CustomerSession = {
  accessToken: string;
  expiresAt: string;
  email: string;
  customerId?: string;
  rememberMe: boolean;
  provider: AuthProviderId;
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptsMarketing?: boolean;
  acceptsTerms: boolean;
  /** Auto sign-in after create (default true) */
  autoLogin?: boolean;
};

export type LoginSuccess = {
  ok: true;
  session: CustomerSession;
  redirectTo: string;
};

export type LoginFailure = {
  ok: false;
  code: AuthErrorCode;
  error: string;
};

export type LoginResult = LoginSuccess | LoginFailure;

export type RegisterSuccess = {
  ok: true;
  session: CustomerSession | null;
  email: string;
  redirectTo: string;
  autoLoggedIn: boolean;
};

export type RegisterFailure = {
  ok: false;
  code: AuthErrorCode;
  error: string;
};

export type RegisterResult = RegisterSuccess | RegisterFailure;

export type RecoverInput = {
  email: string;
};

export type RecoverSuccess = {
  ok: true;
  email: string;
};

export type RecoverFailure = {
  ok: false;
  code: AuthErrorCode;
  error: string;
};

export type RecoverResult = RecoverSuccess | RecoverFailure;

export type AuthProvider = {
  id: AuthProviderId;
  login: (input: LoginInput) => Promise<LoginResult>;
  register: (input: RegisterInput) => Promise<RegisterResult>;
  recover: (input: RecoverInput) => Promise<RecoverResult>;
};
