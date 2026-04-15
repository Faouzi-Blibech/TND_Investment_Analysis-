import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals);
}

export function formatPercent(num: number): string {
  return `${num > 0 ? "+" : ""}${num.toFixed(2)}%`;
}
