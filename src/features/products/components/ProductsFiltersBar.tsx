
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type {
  ProductCategoryOption,
  ProductsFilterMode,
} from '../api/products.api.types';

interface ProductsFiltersBarProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  categories: readonly ProductCategoryOption[];
  isLoadingCategories: boolean;
  activeMode: ProductsFilterMode;
  onClearFilters: () => void;
}

export function ProductsFiltersBar({
  searchInput,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  isLoadingCategories,
  activeMode,
  onClearFilters,
}: ProductsFiltersBarProps) {
  const hasActiveFilter =
    activeMode.mode !== 'all' ||
    searchInput.trim().length > 0 ||
    selectedCategory.length > 0;

  const activeCategoryName =
    categories.find((cat) => cat.slug === selectedCategory)?.name ??
    selectedCategory;

  return (
    <div className="space-y-3 border-b border-slate-200 p-4 sm:p-5">
      {/*Search bar and Category*/}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input*/}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="products-search" className="sr-only">
            Search products
          </label>
          <Input
            id="products-search"
            type="search"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="pl-9 pr-9 bg-white border-slate-200 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {searchInput.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Filter list by category*/}
        <div className="w-full sm:w-56">
          <label htmlFor="products-category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="products-category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={isLoadingCategories}
            className={cn(
              'flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-2xs transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            <option value="">
              {isLoadingCategories ? 'Loading categories...' : 'All categories'}
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*  Mode Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Filter className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          <span>Active view:</span>

          {activeMode.mode === 'all' && (
            <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
              All Products
            </span>
          )}

          {activeMode.mode === 'search' && (
            <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
              Search: &ldquo;{activeMode.searchQuery}&rdquo;
            </span>
          )}

          {activeMode.mode === 'category' && (
            <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
              Category: {activeCategoryName}
            </span>
          )}
        </div>

        {hasActiveFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 gap-1 px-2 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear filters</span>
          </Button>
        )}
      </div>
    </div>
  );
}