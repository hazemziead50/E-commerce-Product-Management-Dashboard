import { PRODUCT_FALLBACKS } from '@/config/constants';
import type { Product } from '../api/products.api.types';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export function formatProductPrice(price: number): string {
  return usdFormatter.format(price);
}

export function getProductAvailabilityStatus(product: Product): string {
  const status = product.availabilityStatus?.trim();
  return status && status.length > 0
    ? status
    : PRODUCT_FALLBACKS.AVAILABILITY_STATUS;
}


export function getStatusBadgeClasses(status: string): string {
  const normalized = status.toLowerCase();

  if (normalized.includes('out')) {
    return 'border-red-200 bg-red-50 text-red-700';
  }

  if (normalized.includes('low')) {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }

  return 'border-emerald-200 bg-emerald-50 text-emerald-700';
}

