// src/components/layout/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import  Navbar  from './Navbar';
import  Sidebar  from './Sidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70 text-slate-900">
      {/* (Keyboard Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>


      <Navbar />

     
      <div className="flex flex-1">

        <Sidebar />

   
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 focus:outline-none"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}