import axios from "axios";

const BASE_URL = "https://dummyjson.com";

// fetching 12 items at a time when no filter are applied
export const getProducts = ({ limit = 12, skip = 0 } = {}) => {
  return axios
    .get(`${BASE_URL}/products`, { params: { limit, skip } })
    .then((res) => res.data);
};

// full fetching based on a certain category is selected
export const getProductsByCategory = (
  category,
  { limit = 0, skip = 0 } = {},
) => {
  return axios
    .get(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, {
      params: { limit, skip },
    })
    .then((res) => res.data);
};

// get different categories
export const getCategories = () =>
  axios
    .get(`${BASE_URL}/products/categories`)
    .then((res) => res.data.map((c) => (typeof c === "string" ? c : c.slug)));

export const getAllBrands = () => {
  return axios
    .get(`${BASE_URL}/products`, {
      params: { limit: 0, select: "brand" },
    })
    .then((result) => [
      ...new Set(result.data.products.map((p) => p.brand).filter(Boolean)),
    ]);
};

//get brands for selected category
export const getBrandsForCategories = async (categories) => {
  const result = await Promise.all(
    categories.map((cat) => {
     return axios
        .get(`${BASE_URL}/products/category/${encodeURIComponent(cat)}`, {
          params: { limit: 0, select: "brand" },
        })
        .then((res) => res.data.products);
    }),
  );

  const mergedList = result.flat();

  return [...new Set(mergedList.map((p) => p.brand).filter(Boolean))];
};

// extract products
export const getProductById = (id) =>
  axios.get(`${BASE_URL}/products/${id}`).then((res) => res.data);
