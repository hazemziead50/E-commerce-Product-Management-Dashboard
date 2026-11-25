
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Loader2,
  PackageOpen,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { PAGINATION_CONFIG, SEARCH_CONFIG } from '@/config/constants';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Button } from '@/components/ui/button';
import type {
  GetProductsParams,
  ProductsFilterMode,
} from '../api/products.api.types';
import { ProductsFiltersBar } from '../components/ProductsFiltersBar';
import { ProductsPagination } from '../components/ProductsPagination';
import { ProductsTable } from '../components/ProductsTable';
import { useProductCategoriesQuery } from '../hooks/useProductCategoriesQuery';
import { useProductsQuery } from '../hooks/useProductsQuery';

export function ProductsListPage() {
  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(
    PAGINATION_CONFIG.DEFAULT_PAGE_SIZE
  );
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const debouncedSearch = useDebouncedValue(
    searchInput.trim(),
    SEARCH_CONFIG.DEBOUNCE_DELAY_MS
  );

  // Mutually Exclusive
  //When depende changencies only recreate this object in memory (useMemo)
  const filterMode: ProductsFilterMode = useMemo(() => {
    if (selectedCategory) {
      return { mode: 'category', categorySlug: selectedCategory };
    }
    if (debouncedSearch) {
      return { mode: 'search', searchQuery: debouncedSearch };
    }
    return { mode: 'all' };
  }, [selectedCategory, debouncedSearch]);


  const queryParams: GetProductsParams = useMemo(
    () => ({
      ...filterMode,
      page,
      pageSize,
    }),
    [filterMode, page, pageSize]
  );

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProductsQuery(queryParams);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
  } = useProductCategoriesQuery();

  // Search change
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (value.trim().length > 0 && selectedCategory) {
      setSelectedCategory('');
    }
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  };

  //Category change
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug.length > 0 && searchInput) {
      setSearchInput('');
    }
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchInput('');
    setSelectedCategory('');
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  };

  const products = productsResponse?.products ?? [];
  const total = productsResponse?.total ?? 0;

  return (
    <div className="w-full space-y-5">
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Products
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-2xs transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:self-auto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Create product</span>
        </Link>
      </div>

  
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <ProductsFiltersBar
          searchInput={searchInput}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          activeMode={filterMode}
          onClearFilters={handleClearFilters}
        />

        {/* Loading State */}
        {isLoading && (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center"
          >
            <Loader2
              className="h-8 w-8 animate-spin text-blue-600"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Loading products...
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Fetching catalog items from the server.
              </p>
            </div>
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoading && isError && (
          <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="max-w-md space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                Unable to load products
              </p>
              <p className="text-xs text-slate-500">
                {error instanceof Error
                  ? error.message
                  : 'Something went wrong while fetching products.'}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void refetch()}
              className="mt-1 gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retry</span>
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <PackageOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="max-w-md space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                No products found
              </p>
              <p className="text-xs text-slate-500">
                No products matched your current search or category filter.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="mt-1 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Table + Pagination */}
        {!isLoading && !isError && products.length > 0 && (
          <>
            <ProductsTable products={products} isFetching={isFetching} />
            <ProductsPagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>
    </div>
  );
}