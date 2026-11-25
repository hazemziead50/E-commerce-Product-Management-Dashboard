// src/features/products/pages/CreateProductPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '../api/products.api.types';
import { ProductForm } from '../components/ProductForm';
import {
  mapFormValuesToCreatePayload,
  type ProductFormValues,
} from '../forms/product.form.types';
import { useCreateProductMutation } from '../hooks/useCreateProductMutation';
import { useProductCategoriesQuery } from '../hooks/useProductCategoriesQuery';

export function CreateProductPage() {
  const navigate = useNavigate();
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
  } = useProductCategoriesQuery();

  const createMutation = useCreateProductMutation();

  const handleCreateProduct = async (values: ProductFormValues) => {
    setCreatedProduct(null);
    const payload = mapFormValuesToCreatePayload(values);

    try {
      const result = await createMutation.mutateAsync(payload);
      setCreatedProduct(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-4">
     
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Create Product
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Add a new product to your catalog with pricing, stock, and gallery images.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Products</span>
        </Link>
      </div>

      
      <div
        role="note"
        className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs text-blue-900"
      >
        <Info className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
        <p>
          <span className="font-semibold">Simulated API Environment:</span> DummyJSON
          simulates product creation and returns a mock response without persisting
          changes to its database.
        </p>
      </div>

      {/* sucscess message*/}
      {createdProduct && (
        <div
          role="status"
          className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-emerald-950 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold">
                Product &ldquo;{createdProduct.title}&rdquo; created (Simulated ID: #
                {createdProduct.id})
              </p>
              <p className="text-xs text-emerald-800">
                The product list cache has been invalidated. Note that this simulated ID is
                not persisted on DummyJSON servers.
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => navigate('/products')}
            className="shrink-0 border-emerald-300 bg-white text-emerald-900 hover:bg-emerald-100"
          >
            Return to Products List
          </Button>
        </div>
      )}

      {/*error message */}
      {createMutation.isError && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-900"
        >
          <AlertCircle
            className="h-5 w-5 shrink-0 text-red-600"
            aria-hidden="true"
          />
          <p className="text-xs font-medium text-red-800">
            <span className="font-semibold">Failed to create product: </span>
            {createMutation.error instanceof Error
              ? createMutation.error.message
              : 'An unexpected error occurred. Your form inputs have been preserved.'}
          </p>
        </div>
      )}

     
      <ProductForm
        categories={categories}
        isLoadingCategories={isLoadingCategories}
        onSubmit={handleCreateProduct}
        onCancel={() => navigate('/products')}
        isSubmitting={createMutation.isPending}
        submitLabel="Create Product"
      />
    </div>
  );
}