/**
 * Format a number as Vietnamese currency.
 * @param amount Number to format.
 * @returns Formatted currency string.
 */
export function formatVNCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
