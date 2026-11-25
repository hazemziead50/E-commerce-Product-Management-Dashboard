import { createBrowserRouter,Navigate } from "react-router";
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CreateProductPage } from '@/features/products/pages/CreateProductPage';
import { ProductsListPage } from '@/features/products/pages/ProductsListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      
      {
        path: "products/new",
        element: <CreateProductPage />,
      },
      {
        path: "products",
        element: <ProductsListPage/>,
      },
      {
        path: 'categories',
        element: (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Categories Management Workspace (Phase 3)
          </div>
        ),
      },
      {
        path: '*',
        element: (
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold">404 - الصفحة غير موجودة</h1>
          </div>
        ),
      },
    ],
  },
]);