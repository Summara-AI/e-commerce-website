"use server";

import type { ActionResult } from "./cart";

/** Optional analytics / merchandising log — never block UX */
export async function logSearchAction(input: {
  query: string;
  resultCount: number;
}): Promise<ActionResult> {
  void input;
  return { ok: true, data: undefined };
}
