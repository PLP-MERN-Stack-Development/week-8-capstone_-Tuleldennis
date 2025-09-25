/**
 * Currency utilities for Kenyan Shillings (KSH)
 */

export function formatPrice(price: number): string {
  return `KSH ${price.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export function formatPriceWithDecimals(price: number): string {
  return `KSH ${price.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Convert USD prices to approximate KSH (1 USD ≈ 150 KSH as of 2024)
export function convertUSDToKSH(usdPrice: number): number {
  return Math.round(usdPrice * 150)
}
