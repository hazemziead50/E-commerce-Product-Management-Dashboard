
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGINATION_CONFIG } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductsPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage, 'ellipsis', totalPages];
}

export function ProductsPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: ProductsPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);
  const visiblePages = getVisiblePageNumbers(page, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      {/* Number of products & Selaction of page size*/}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 sm:text-sm">
        <span>
          Showing <span className="font-semibold text-slate-900">{startItem}</span>
          –<span className="font-semibold text-slate-900">{endItem}</span> of{' '}
          <span className="font-semibold text-slate-900">{total}</span> products
        </span>

        <div className="flex items-center gap-1.5">
          <label htmlFor="products-page-size" className="text-xs text-slate-500">
            Per page:
          </label>
          <select
            id="products-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {PAGINATION_CONFIG.PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page navigation buttons*/}
      <nav
        aria-label="Products pagination"
        className="flex items-center gap-1 self-start sm:self-auto"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 gap-1 border-slate-200 px-2.5 text-xs text-slate-700"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Previous</span>
        </Button>

        {visiblePages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-xs text-slate-400"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={item === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                'h-8 w-8 p-0 text-xs',
                item === page
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              )}
            >
              {item}
            </Button>
          )
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 gap-1 border-slate-200 px-2.5 text-xs text-slate-700"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}