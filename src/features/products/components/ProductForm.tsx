
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ProductCategoryOption } from '../api/products.api.types';
import {
  DEFAULT_PRODUCT_FORM_VALUES,
  type ProductFormInput,
  type ProductFormValues,
} from '../forms/product.form.types';
import { productSchema } from '../schemas/product.schema';

interface ProductFormProps {
  defaultValues?: ProductFormInput;
  resetKey?: string | number;
  categories: readonly ProductCategoryOption[];
  isLoadingCategories?: boolean;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function ProductForm({
  defaultValues = DEFAULT_PRODUCT_FORM_VALUES,
  resetKey = 'create',
  categories,
  isLoadingCategories = false,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = 'Create Product',
}: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalImages',
  });

  const previousResetKeyRef = useRef<string | number>(resetKey);
  useEffect(() => {
    if (previousResetKeyRef.current !== resetKey) {
      reset(defaultValues);
      previousResetKeyRef.current = resetKey;
    }
  }, [resetKey, defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full"
    >
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
     
        <div className="space-y-4 lg:col-span-7">
          {/* 1.(Basic Information) */}
          <section
            aria-labelledby="section-basic-info"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5"
          >
            <div className="mb-3 border-b border-slate-100 pb-2.5">
              <h2
                id="section-basic-info"
                className="text-base font-semibold text-slate-900"
              >
                Basic Information
              </h2>
              <p className="text-xs text-slate-500">
                Enter the core product details displayed to customers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/*  Title */}
              <div className="sm:col-span-2 space-y-1">
                <Label htmlFor="product-title" className="text-slate-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-title"
                  placeholder="e.g., Wireless Noise-Cancelling Headphones"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? 'product-title-error' : undefined}
                  disabled={isSubmitting}
                  {...register('title')}
                />
                {errors.title && (
                  <p id="product-title-error" className="text-xs font-medium text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/*  Description */}
              <div className="sm:col-span-2 space-y-1">
                <Label htmlFor="product-description" className="text-slate-700">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="product-description"
                  rows={2}
                  placeholder="Describe the key features, specifications, and materials..."
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? 'product-description-error' : undefined
                  }
                  disabled={isSubmitting}
                  {...register('description')}
                />
                {errors.description && (
                  <p
                    id="product-description-error"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/*  Category */}
              <div className="space-y-1">
                <Label htmlFor="product-category" className="text-slate-700">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="product-category"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={
                    errors.category ? 'product-category-error' : undefined
                  }
                  disabled={isSubmitting || isLoadingCategories}
                  className={cn(
                    'flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-xs transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    errors.category && 'border-red-500 focus-visible:ring-red-500'
                  )}
                  {...register('category')}
                >
                  <option value="">
                    {isLoadingCategories ? 'Loading categories...' : 'Select a category'}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p
                    id="product-category-error"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/*   Brand */}
              <div className="space-y-1">
                <Label htmlFor="product-brand" className="text-slate-700">
                  Brand <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-brand"
                  placeholder="e.g., Sony, Apple, Logitech"
                  aria-invalid={Boolean(errors.brand)}
                  aria-describedby={errors.brand ? 'product-brand-error' : undefined}
                  disabled={isSubmitting}
                  {...register('brand')}
                />
                {errors.brand && (
                  <p id="product-brand-error" className="text-xs font-medium text-red-600">
                    {errors.brand.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 4.(Images & Repeatable URLs) */}
          <section
            aria-labelledby="section-images"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5"
          >
            <div className="mb-3 border-b border-slate-100 pb-2.5">
              <h2
                id="section-images"
                className="text-base font-semibold text-slate-900"
              >
                Images
              </h2>
              <p className="text-xs text-slate-500">
                Provide valid HTTP or HTTPS URLs for the thumbnail and gallery images.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Thumbnail URL */}
              <div className="space-y-1">
                <Label htmlFor="product-thumbnail" className="text-slate-700">
                  Thumbnail URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-thumbnail"
                  type="url"
                  placeholder="https://example.com/images/product-thumb.jpg"
                  aria-invalid={Boolean(errors.thumbnail)}
                  aria-describedby={
                    errors.thumbnail ? 'product-thumbnail-error' : undefined
                  }
                  disabled={isSubmitting}
                  {...register('thumbnail')}
                />
                {errors.thumbnail && (
                  <p
                    id="product-thumbnail-error"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

                {/* Additional Images*/}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700">Additional Image URLs</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ url: '' })}
                    disabled={isSubmitting}
                    className="h-8 gap-1.5 border-slate-200 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <ImagePlus className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                    <span>Add Image URL</span>
                  </Button>
                </div>

                {fields.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/70 px-3 py-2 text-center text-xs text-slate-500">
                    No additional images added. Click &ldquo;Add Image URL&rdquo; to attach
                    gallery images.
                  </p>
                ) : (
                  <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                    {fields.map((field, index) => {
                      const rowError = errors.additionalImages?.[index]?.url;

                      return (
                        <div key={field.id} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Label
                                htmlFor={`additional-image-${field.id}`}
                                className="sr-only"
                              >
                                Additional Image URL {index + 1}
                              </Label>
                              <Input
                                id={`additional-image-${field.id}`}
                                type="url"
                                placeholder={`https://example.com/images/gallery-${index + 1}.jpg`}
                                aria-invalid={Boolean(rowError)}
                                aria-describedby={
                                  rowError
                                    ? `additional-image-error-${field.id}`
                                    : undefined
                                }
                                disabled={isSubmitting}
                                {...register(`additionalImages.${index}.url`)}
                              />
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                              disabled={isSubmitting}
                              aria-label={`Remove additional image ${index + 1}`}
                              className="h-9 w-9 shrink-0 text-slate-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </div>

                          {rowError && (
                            <p
                              id={`additional-image-error-${field.id}`}
                              className="text-xs font-medium text-red-600"
                            >
                              {rowError.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* right colomn */}
        <div className="space-y-4 lg:col-span-5">
         
          <section
            aria-labelledby="section-pricing"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5"
          >
            <div className="mb-3 border-b border-slate-100 pb-2.5">
              <h2
                id="section-pricing"
                className="text-base font-semibold text-slate-900"
              >
                Pricing
              </h2>
              <p className="text-xs text-slate-500">
                Set the base price in USD and discount percentage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/*  Price */}
              <div className="space-y-1">
                <Label htmlFor="product-price" className="text-slate-700">
                  Price ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-price"
                  type="text"
                  placeholder="0.00"
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={errors.price ? 'product-price-error' : undefined}
                  disabled={isSubmitting}
                  {...register('price')}
                />
                {errors.price && (
                  <p id="product-price-error" className="text-xs font-medium text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Discount Percentage */}
              <div className="space-y-1">
                <Label htmlFor="product-discount" className="text-slate-700">
                  Discount (%) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-discount"
                  type="text"
                  min="0"
                  max="100"
                  placeholder="0"
                  aria-invalid={Boolean(errors.discountPercentage)}
                  aria-describedby={
                    errors.discountPercentage ? 'product-discount-error' : undefined
                  }
                  disabled={isSubmitting}
                  {...register('discountPercentage')}
                />
                {errors.discountPercentage && (
                  <p
                    id="product-discount-error"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 3. (Inventory) */}
          <section
            aria-labelledby="section-inventory"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5"
          >
            <div className="mb-3 border-b border-slate-100 pb-2.5">
              <h2
                id="section-inventory"
                className="text-base font-semibold text-slate-900"
              >
                Inventory
              </h2>
              <p className="text-xs text-slate-500">
                Manage available stock quantity and unique SKU identifier.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/*  Stock Quantity */}
              <div className="space-y-1">
                <Label htmlFor="product-stock" className="text-slate-700">
                  Stock Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-stock"
                  type="text"
                  step="1"
                  placeholder="0"
                  aria-invalid={Boolean(errors.stock)}
                  aria-describedby={errors.stock ? 'product-stock-error' : undefined}
                  disabled={isSubmitting}
                  {...register('stock')}
                />
                {errors.stock && (
                  <p id="product-stock-error" className="text-xs font-medium text-red-600">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              {/*   SKU */}
              <div className="space-y-1">
                <Label htmlFor="product-sku" className="text-slate-700">
                  SKU <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-sku"
                  placeholder="e.g., AUD-WH-001"
                  aria-invalid={Boolean(errors.sku)}
                  aria-describedby={errors.sku ? 'product-sku-error' : undefined}
                  disabled={isSubmitting}
                  {...register('sku')}
                />
                {errors.sku && (
                  <p id="product-sku-error" className="text-xs font-medium text-red-600">
                    {errors.sku.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/*    Actions */}
          <div className="flex flex-col-reverse gap-2.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600"
            >
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              <span>{isSubmitting ? 'Saving...' : submitLabel}</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}