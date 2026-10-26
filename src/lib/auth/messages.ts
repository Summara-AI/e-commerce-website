import type { AuthErrorCode } from "./types";

export const LOGIN_COPY = {
  eyebrow: "Welcome back",
  title: "Continue your skincare journey",
  description:
    "Sign in to view your orders, wishlist, saved addresses and faster checkout.",
  emailLabel: "Email",
  passwordLabel: "Password",
  rememberMe: "Remember me",
  forgotPassword: "Forgot password",
  submit: "Sign In",
  divider: "OR",
  guest: "Continue as Guest",
  noAccount: "Don't have an account?",
  createAccount: "Create one",
  mediaAlt:
    "Soft daylight skincare ritual — editorial lifestyle photography for account sign-in",
} as const;

export const REGISTER_COPY = {
  eyebrow: "Join SCYN",
  title: "Create your account",
  description:
    "Save your favourites, track your orders, enjoy faster checkout, and receive exclusive skincare updates.",
  firstNameLabel: "First name",
  lastNameLabel: "Last name",
  emailLabel: "Email address",
  passwordLabel: "Password",
  confirmPasswordLabel: "Confirm password",
  marketing:
    "Subscribe to skincare tips and exclusive launches",
  termsPrefix: "I agree to the",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  submit: "Create Account",
  divider: "OR",
  guest: "Continue as Guest",
  hasAccount: "Already have an account?",
  signIn: "Sign In",
  successTitle: "Welcome to SCYN.",
  successBody: "Your skincare journey begins here.",
  mediaAlt:
    "Premium Korean skincare ritual — soft daylight editorial for account registration",
} as const;

export const RECOVER_COPY = {
  eyebrow: "Account recovery",
  title: "Forgot your password?",
  description:
    "Enter the email address associated with your account and we'll send you a secure password reset link.",
  emailLabel: "Email address",
  submit: "Send Reset Link",
  rememberPassword: "Remember your password?",
  backToSignIn: "Back to Sign In",
  successTitle: "Check your inbox",
  successBody:
    "We've sent a secure password reset link to your email address.",
  successHint:
    "If you don't see it within a few minutes, please check your spam or promotions folder.",
  returnToLogin: "Return to Login",
  resendEmail: "Resend Email",
  resendWait: (seconds: number) => `Resend in ${seconds}s`,
  mediaAlt:
    "Calm cream textures and soft daylight — editorial photography for password recovery",
} as const;

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  INVALID_CREDENTIALS: "Incorrect email or password.",
  ACCOUNT_NOT_FOUND: "Email not found.",
  INCORRECT_PASSWORD: "Incorrect password.",
  TOO_MANY_ATTEMPTS: "Too many requests. Please wait a moment and try again.",
  SERVER_UNAVAILABLE: "Server unavailable. Please try again shortly.",
  NETWORK: "Network issue. Check your connection and try again.",
  VALIDATION: "Please complete all required fields.",
  EMAIL_EXISTS: "Email already exists.",
  WEAK_PASSWORD: "Weak password. Please meet all requirements.",
  PASSWORD_MISMATCH: "Passwords must match.",
  TERMS_REQUIRED: "Please accept the Privacy Policy and Terms to continue.",
  UNKNOWN: "Something went wrong. Please try again.",
};

export function authErrorMessage(code: AuthErrorCode): string {
  return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.UNKNOWN;
}
