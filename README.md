# E-commerce Product Management Dashboard

A responsive e-commerce admin dashboard built with React, TypeScript, and TanStack Query.

**Current Scope (Phase 1 — `feat/products-list-create`):** Responsive admin shell, paginated products catalog with mutually exclusive search and category filtering, and a validated Create Product form.

## Tech Stack

* **Core:** React + TypeScript (Strict Mode)

* **Server State & Caching:** TanStack Query (`@tanstack/react-query`)

* **Routing:** React Router (`react-router-dom`)

* **Forms & Validation:** React Hook Form + Zod (`@hookform/resolvers`)

* **Styling & UI:** Tailwind CSS + shadcn/ui + Lucide Icons

## Prerequisites

* **Node.js:** v18.0.0 or higher

* **Package Manager:** npm v9+ (or pnpm)

## Getting Started

1. **Clone the repository and checkout the Phase 1 branch:**

   ```
   git clone <repository-url>
   cd E-commerce-Product-Management-Dashboard
   git checkout feat/products-list-create
   
   ```

2. **Install dependencies:**

   ```
   npm install
   
   ```

3. **Environment Variables (Optional):**
   Create a `.env` file in the root directory if you wish to override the default API base URL:

   ```
   VITE_API_BASE_URL=https://dummyjson.com
   
   ```

   *(If omitted, the app defaults to `https://dummyjson.com` via `src/config/constants.ts`.)*

4. **Start the development server:**

   ```
   npm run dev
   
   ```

## Available Scripts

| Command | Description | 
| ----- | ----- | 
| `npm run dev` | Starts the local development server | 
| `npm run type-check` | Runs strict TypeScript compiler checks (`tsc -b --noEmit`) | 
| `npm run lint` | Runs ESLint across the project | 
| `npm run build` | Type-checks and builds the production bundle | 

## Project Structure (Phase 1)

```
src/
├── app/                     # QueryClientProvider and application routes
├── components/
│   ├── layout/              # Responsive AdminLayout, Desktop Sidebar, Top Navbar & Mobile Sheet
│   └── ui/                  # Reusable shadcn/ui primitives
├── config/
│   └── constants.ts         # API base URL, pagination defaults, debounce delay, and fallbacks
├── hooks/
│   └── useDebouncedValue.ts # Debounce hook for search input
└── features/
    └── products/
        ├── api/             # HTTP functions and strict TypeScript API types
        ├── hooks/           # Query key factory, useProductsQuery, useCreateProductMutation
        ├── schemas/         # Zod runtime validation schema
        ├── forms/           # Form types and explicit API payload mappers
        ├── components/      # ProductsTable, ProductsFiltersBar, ProductsPagination, ProductForm
        ├── pages/           # ProductsListPage and CreateProductPage
        └── utils/           # Currency and availability status formatters

```

## API Behavior & Known Limitations

This application integrates with the [DummyJSON Products API](https://dummyjson.com/docs/products):

1. **Simulated Write Operations:**

   * Submitting the Create Product form sends a `POST /products/add` request, which DummyJSON simulates without persisting changes to its database.

   * Invalidating or refetching the products list restores the original server catalog. A simulation notice is displayed on the Create Product page.

2. **Mutually Exclusive Search & Category Filtering:**

   * DummyJSON provides separate endpoints for search (`GET /products/search`) and category filtering (`GET /products/category/{slug}`) and does not support combining both in a single request.

   * Typing a search query clears any selected category, and selecting a category clears the search query. An **Active view** badge indicates the current filter mode, and pagination automatically resets to page `1`.

3. **Documented Fallbacks:**

   * When `availabilityStatus` is missing from a product record, the table displays `"In Stock"` (`PRODUCT_FALLBACKS.AVAILABILITY_STATUS`).

4. **Placeholders for Upcoming Phases:**

   * Table row **Edit** actions are disabled until Phase 2 (`feat/product-edit-advanced-forms`).

   * The **Categories** route is a placeholder until Phase 3 (`feat/category-management`).

