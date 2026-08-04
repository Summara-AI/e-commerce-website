import type { StoreMenu } from "@/types";

export function adaptStorefrontMenu(node: unknown): StoreMenu {
  void node;
  throw new Error(
    "[adapters/menu] Not implemented — implement when menu queries go live (11C).",
  );
}
