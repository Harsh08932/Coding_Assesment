# Product Listing & Detail Page (Amazon-style)

A React application built against the [DummyJSON Products API](https://dummyjson.com/docs/products), featuring category/price/brand filtering, pagination, a collapsible filter sidebar, and a product detail page with Next/Previous navigation through the currently filtered result set.

**Live demo:** https://frontassesment.netlify.app/

## Tech Stack

- React + Vite
- React Router (`createBrowserRouter` / `RouterProvider`)
- Tailwind CSS
- Axios
- Context API (sidebar toggle state)

## Setup Instructions

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the printed local URL (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Assumptions Made

- DummyJSON does not support server-side price-range or brand filtering, and its category endpoint only accepts one category per request. As a result:
  - When **no filters** are active, the app uses true server-side pagination (`limit`/`skip`), fetching only 10 products per page.
  - The moment **any filter** (category, price, or brand) is applied, the app fetches the full relevant candidate set (either the whole catalog, or the union of all selected categories via parallel requests) and performs filtering and pagination client-side.
- **Brand options are scoped to the selected category(ies).** If no category is selected, the brand list reflects the entire catalog; if one or more categories are selected, only brands present within those categories are shown. This is implemented via DummyJSON's `select` query parameter to keep these lookups lightweight.
- Multiple categories can be selected simultaneously (OR logic — a product matching _any_ selected category is included), combined with price range and brand (AND logic across filter types).
- Price filtering requires an explicit "Apply" action rather than filtering on every keystroke, to avoid re-filtering the grid while the user is still typing a number.
- The sidebar is hidden by default and toggled via the navbar's hamburger icon, using Context API to share toggle state between the (sibling) Navbar and product listing page components.

## Architectural Decisions

- **Filters and pagination live in the URL (`useSearchParams`)**, not component state. This is what allows the browser's Back button and page refresh to correctly restore the exact filter/page combination the user had applied — the URL is the single source of truth, and nothing about filter state is duplicated into a separate `useState`.
- **API layer (`src/api/`)** isolates every network call behind named functions. No component or hook calls `axios` directly — this keeps data-fetching logic swappable and testable independent of the UI.
- **`useProducts` custom hook** owns all fetching, filtering, and pagination math, switching between server-side and client-side strategies based on whether any filter is active. This keeps the page component focused purely on layout and wiring, not data logic.
- **Component structure** favors small, prop-driven, stateless components (`ProductCard`, `Pagination`, `ProductNav`) alongside a few controlled, self-contained components with local UI state seeded from props (`Filter`), so the parent page remains the single coordinator of "what the current filters actually are."
- **Product detail Next/Previous navigation** uses React Router's navigation `state` to carry the currently filtered list of product IDs from the listing page to the detail page, allowing users to step through filtered results without returning to the grid. `replace: true` is used specifically for Next/Prev navigations (but not the initial click into a product) so that browsing through several products via Next/Prev collapses into a single history entry — ensuring one Back press returns directly to the filtered listing page, rather than stepping back through each intermediate product.
- **Context API** is used narrowly, only for sidebar open/closed state — the one piece of state genuinely shared between non-adjacent components (Navbar and the listing page, both children of the layout shell). Filters were deliberately kept out of Context, since their real requirement (surviving navigation and refresh) is satisfied by the URL, not by any form of in-memory React state.
