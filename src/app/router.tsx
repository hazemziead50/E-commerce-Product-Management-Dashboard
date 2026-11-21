import { createBrowserRouter,Navigate } from "react-router";
import { AdminLayout } from '@/components/layout/AdminLayout';

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
        path: 'products',

        element: <div className="text-xl font-semibold">صفحة إدارة المنتجات</div>,
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