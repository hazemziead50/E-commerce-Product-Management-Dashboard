
import { useState } from 'react';
import { ImageOff, Pencil, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Product } from '../api/products.api.types';
import {
  formatProductPrice,
  getProductAvailabilityStatus,
  getStatusBadgeClasses,
} from '../utils/product.formatters';

interface ProductsTableProps {
  products: readonly Product[];
  isFetching?: boolean;
}

function ProductThumbnail({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400"
        aria-label="No product image"
      >
        <ImageOff className="h-4 w-4" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-11 w-11 shrink-0 rounded-lg border border-slate-200 bg-slate-50 object-cover"
    />
  );
}

export function ProductsTable({
  products,
  isFetching = false,
}: ProductsTableProps) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto transition-opacity',
        isFetching && 'opacity-70'
      )}
    >
      <table className="w-full min-w-[780px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-700">
            <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-5">
              Product
            </th>
            <th scope="col" className="px-3 py-3.5">
              Category
            </th>
            <th scope="col" className="px-3 py-3.5">
              Price
            </th>
            <th scope="col" className="px-3 py-3.5">
              Stock
            </th>
            <th scope="col" className="px-3 py-3.5">
              Rating
            </th>
            <th scope="col" className="px-3 py-3.5">
              Status
            </th>
            <th scope="col" className="py-3.5 pl-3 pr-4 text-right sm:pr-5">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {products.map((product) => {
            const status = getProductAvailabilityStatus(product);

            return (
              <tr
                key={product.id}
                className="transition-colors hover:bg-slate-50/70"
              >
                {/* Thumbnail & Title */}
                <td className="py-3.5 pl-4 pr-3 sm:pl-5">
                  <div className="flex items-center gap-3">
                    <ProductThumbnail
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <div className="min-w-0 max-w-xs">
                      <p className="truncate font-semibold text-slate-900">
                        {product.title}
                      </p>
                      {product.brand && (
                        <p className="truncate text-xs text-slate-500">
                          {product.brand}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100/80 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                </td>

                {/* Pricing*/}
                <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-slate-900">
                  {formatProductPrice(product.price)}
                </td>

                {/* Stock */}
                <td className="whitespace-nowrap px-3 py-3.5 text-slate-700">
                  {product.stock}
                </td>

                {/* Rating */}
                <td className="whitespace-nowrap px-3 py-3.5">
                  <div className="inline-flex items-center gap-1.5">
                    <Star
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-slate-700">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </td>

                {/*  Availability Status   */}
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium',
                      getStatusBadgeClasses(status)
                    )}
                  >
                    {status}
                  </span>
                </td>

                {/* Edit product button */}
                <td className="whitespace-nowrap py-3.5 pl-3 pr-4 text-right sm:pr-5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled
                    title="Edit & Delete actions will be added in Phase 2"
                    className="h-8 gap-1.5 border-slate-200 text-xs text-slate-600"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit</span>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}