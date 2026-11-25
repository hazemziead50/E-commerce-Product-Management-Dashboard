
/* DummyJSON API Types */
export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly brand?: string;
  readonly sku?: string;
  readonly availabilityStatus?: string;
  readonly thumbnail: string;
  readonly images: readonly string[];
}

/*Pagination */

export interface ProductsListResponse {
  readonly products: readonly Product[];
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}

/* GET /products/categories */
export interface ProductCategoryOption {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
}

/*Discriminated Union */
export type ProductsFilterMode =
  | { readonly mode: 'all' }
  | { readonly mode: 'search'; readonly searchQuery: string }
  | { readonly mode: 'category'; readonly categorySlug: string };


  export type GetProductsParams = ProductsFilterMode & {
  readonly page: number;
  readonly pageSize: number;
};

/* Creat new products */
export interface CreateProductPayload {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly brand: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly stock: number;
  readonly sku: string;
  readonly thumbnail: string;
  readonly images: readonly string[];
}

/* Update products */
export type UpdateProductPayload = Partial<CreateProductPayload>;

/* Delete */
export interface DeleteProductResponse extends Product {
  readonly isDeleted: boolean;
  readonly deletedOn: string;
}