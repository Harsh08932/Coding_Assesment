import { useEffect, useState } from "react";

import {
  getProducts,
  getProductsByCategory,
  getAllBrands,
  getBrandsForCategories,
} from "../apiCall/productApi";

const PAGE_SIZE = 12;

export function useData(
  { category = [], minPrice, maxPrice, brands = [] },
  page = 1,
) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [allFilteredIds, setAllFilteredIds] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const needsClientFilter =
    category.length > 0 || !!minPrice || !!maxPrice || brands.length > 0;

  // sideeffect for fetching brand
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const list =
          category.length > 0
            ? await getBrandsForCategories(category)
            : await getAllBrands();
        if (active) setAvailableBrands(list);
      } catch (err) {
        console.error("Brand fetch failed:", err);
      }
    })();

    return () => {
      active = false;
    };
  }, [category.join(",")]);

  // for loading product
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (!needsClientFilter) {
          const skip = (page - 1) * PAGE_SIZE;
          const data = await getProducts({ limit: PAGE_SIZE, skip });
          if (!active) return;
          setProducts(data.products);
          setTotalPage(Math.max(1, Math.ceil(data.total / PAGE_SIZE)));
          setAllFilteredIds(data.products.map((product) => product.id));
        } else {
          let res;
          if (category.length > 0) {
            const result = await Promise.all(
              category.map((cat) => getProductsByCategory(cat, { limit: 0 })),
            );
            res = result.flatMap((r) => r.products);
          } else {
            const data = await getProducts({ limit: 0 });
            res = data.products;
          }

          const min = minPrice ? Number(minPrice) : -Infinity;
          const max = maxPrice ? Number(maxPrice) : Infinity;

          const filtered = res.filter((p) => {
            const priceOk = p.price >= min && p.price <= max;
            const brandOk = brands.length === 0 || brands.includes(p.brand);
            return priceOk && brandOk;
          });
          if (!active) return;
          const start = (page - 1) * PAGE_SIZE;
          setProducts(filtered.slice(start, start + PAGE_SIZE));
          setTotalPage(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
          setAllFilteredIds(filtered.map((p) => p.id));
        }
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [category.join(","), minPrice, maxPrice, brands.join(","), page]);

  return {
    products,
    loading,
    error,
    totalPages,
    allFilteredIds,
    availableBrands,
  };
}
