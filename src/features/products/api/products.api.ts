// src/features/products/api/products.api.ts
import { API_CONFIG } from '@/config/constants';
import type {
  CreateProductPayload,
  GetProductsParams,
  Product,
  ProductCategoryOption,
  ProductsListResponse,
} from './products.api.types';

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorData: unknown = await response.json();
      if (
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof errorData.message === 'string'
      ) {
        errorMessage = errorData.message;
      }
    } catch {
      errorMessage = `Request failed with status ${response.status}`;
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

function buildProductsEndpoint(params: GetProductsParams): string {
  const limit = params.pageSize;
  const skip = (params.page - 1) * params.pageSize;

  switch (params.mode) {
    case 'search': {
      const encodedQuery = encodeURIComponent(params.searchQuery.trim());
      return `${API_CONFIG.BASE_URL}/products/search?q=${encodedQuery}&limit=${limit}&skip=${skip}`;
    }
    case 'category': {
      const encodedSlug = encodeURIComponent(params.categorySlug.trim());
      return `${API_CONFIG.BASE_URL}/products/category/${encodedSlug}?limit=${limit}&skip=${skip}`;
    }
    case 'all':
    default: {
      return `${API_CONFIG.BASE_URL}/products?limit=${limit}&skip=${skip}`;
    }
  }
}

export async function getProducts(
  params: GetProductsParams
): Promise<ProductsListResponse> {
  const endpoint = buildProductsEndpoint(params);
  const response = await fetch(endpoint);
  return handleApiResponse<ProductsListResponse>(response);
}

export async function getProductCategories(): Promise<
  readonly ProductCategoryOption[]
> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/products/categories`);
  return handleApiResponse<readonly ProductCategoryOption[]>(response);
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<Product> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse<Product>(response);
}