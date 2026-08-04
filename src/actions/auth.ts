"use server";

import { loginCustomer } from "@/lib/auth/login";
import { recoverCustomer } from "@/lib/auth/recover";
import { registerCustomer } from "@/lib/auth/register";
import {
  clearCustomerSession,
  getCustomerSession,
  setCustomerSession,
} from "@/lib/auth/session";
import type {
  LoginInput,
  LoginResult,
  RecoverInput,
  RecoverResult,
  RegisterInput,
  RegisterResult,
} from "@/lib/auth/types";

/**
 * Shopify-ready customer login action.
 * Persists access token in httpOnly cookie; UI redirects to /account on success.
 */
export async function loginAction(input: LoginInput): Promise<LoginResult> {
  const result = await loginCustomer(input);
  if (result.ok) {
    await setCustomerSession(result.session);
  }
  return result;
}

/**
 * Shopify-ready customer registration.
 * Creates customer, optionally auto-logs in, redirects to /account.
 */
export async function registerAction(input: RegisterInput): Promise<RegisterResult> {
  const result = await registerCustomer(input);
  if (result.ok && result.session) {
    await setCustomerSession(result.session);
  }
  return result;
}

/**
 * Shopify-ready password recovery — customerRecover.
 */
export async function recoverAction(input: RecoverInput): Promise<RecoverResult> {
  return recoverCustomer(input);
}

export async function getSessionAction() {
  return getCustomerSession();
}

export async function logoutAction(): Promise<{ ok: true }> {
  await clearCustomerSession();
  return { ok: true };
}
