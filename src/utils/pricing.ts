// Price configuration for different tiers
const PRICE_TIERS = {
  1: 150, // Premium seats
  2: 100, // Standard seats
  3: 75, // Economy seats
  4: 50, // Budget seats
} as const;

export type PriceTier = keyof typeof PRICE_TIERS;

/**
 * Get the price for a given price tier
 */
export function getPriceForTier(tier: number): number {
  return PRICE_TIERS[tier as PriceTier] || 0;
}

/**
 * Calculate total price for selected seats
 */
export function calculateTotalPrice(
  seats: Array<{ priceTier: number }>
): number {
  return seats.reduce((total, seat) => {
    return total + getPriceForTier(seat.priceTier);
  }, 0);
}
