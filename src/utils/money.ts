import type { MoneyV2 } from "@/types";
import { formatPkr } from "@/lib/catalog";

/** Normalize seed number prices → MoneyV2 (adapter boundary) */
export function moneyFromAmount(
  amount: number | string,
  currencyCode = "PKR",
): MoneyV2 {
  const numeric = typeof amount === "string" ? Number(amount) : amount;
  const safe = Number.isFinite(numeric) ? numeric : 0;
  return {
    amount: safe.toFixed(2),
    currencyCode,
    formatted: formatPkr(safe).formatted,
  };
}

export function moneyAmountNumber(money: MoneyV2 | undefined | null): number {
  if (!money) return 0;
  const n = Number(money.amount);
  return Number.isFinite(n) ? n : 0;
}
