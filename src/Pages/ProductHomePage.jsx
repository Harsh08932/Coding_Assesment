import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../apiCall/productApi";
import { useData } from "../customHooks/useData";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import {useSidebar} from "../customHooks/useSidebar.jsx";
import Loading from '../components/Loading'
const ProductHomePage = () => {
  const { isSidebarOpen } = useSidebar();
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category")
      ? searchParams.get("category").split(",")
      : [],
    minPrice: searchParams.get("min") || "",
    maxPrice: searchParams.get("max") || "",
    brands: searchParams.get("brands")
      ? searchParams.get("brands").split(",")
      : [],
  };
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const {
    products,
    loading,
    error,
    totalPages,
    allFilteredIds,
    availableBrands,
  } = useData(filters, page);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category.length)
      params.set("category", newFilters.category.join(","));
    if (newFilters.minPrice) params.set("min", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("max", newFilters.maxPrice);
    if (newFilters.brands.length)
      params.set("brands", newFilters.brands.join(","));
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };
  return (
    <>
      <div className="flex gap-5 p-5 item-start">
        {isSidebarOpen && (
          <Filter
            categories={categories}
            availableBrands={availableBrands}
            onFilterChange={handleFilterChange}
            initialCategory={filters.category}
            initialMinPrice={filters.minPrice}
            initialMaxPrice={filters.maxPrice}
            initialBrands={filters.brands}
          />
        )}
        <main className="flex-1">
          {loading && <Loading/>}
          {error && <p className="text-red-600">Error: {error}</p>}

          {!loading && !error && (
            <>
              <div className="pt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-6 ">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    productIds={allFilteredIds}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductHomePage;
