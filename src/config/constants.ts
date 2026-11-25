export const API_CONFIG = {
    BASE_URL:import.meta.env.VITE_API_BASE_URL||'https://dummyjson.com'
} as const

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50],
} as const

export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY_MS: 400,
} as const;

export const PRODUCT_FALLBACKS = {
  AVAILABILITY_STATUS: 'In Stock',
} as const;


export const STORAGE_KEYS = {
  CATEGORIES: 'ecommerce_admin_categories',
} as const



