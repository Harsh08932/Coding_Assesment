import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductById } from "../apiCall/productApi";
import RatingStar from "../components/RatingStar";
import ProductNav from "../components/ProductNav";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Regarding navigation from one single product to another
  const productIds = Array.isArray(location.state?.productIds)
    ? location.state.productIds
    : [];

  const currentIndex = productIds.indexOf(Number(id));

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < productIds.length - 1;

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    setLoading(true);
    setError(null);
    setProduct(null);

    getProductById(id)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load product");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

 const goToIndex = (index) => {
   const nextId = productIds[index];
   navigate(`/product/${nextId}`, { state: { productIds }, replace: true });
 };
  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!product)
    return <h4 className="font-bold text-center">No Product Found</h4>;
  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => {
            const filterParams = new URLSearchParams(
              location.state?.filters || {},
            ).toString();
            navigate(`/?${filterParams}`);
          }}
          className="mb-4 px-4 py-2 border rounded text-sm border-gray-300"
        >
          ← Back
        </button>

        {/* Main product layout */}
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow">
          {/* Left side: product image */}
          <div className="shrink-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:w-80 h-80 object-contain border-grey-600 rounded-lg"
            />
          </div>

          {/* Right side: product details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <p className="text-xl font-bold mb-2">${product.price}</p>
            <RatingStar ratingValue={product.rating} className="mt-4" />

            <p className="text-sm text-gray-600 mb-1">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Category:</strong> {product.category}
            </p>

            {/* Description */}
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Reviews (optional, if product has reviews array) */}
            {product.reviews && product.reviews.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Reviews</h3>
                <div className="space-y-2">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="border-t pt-2">
                      <div className="text-sm font-semibold">
                        <span>{review.reviewerName}</span>
                        <div className="mt-1">
                          <RatingStar ratingValue={review.rating} />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
        {productIds.length > 0 && (
            <ProductNav
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={() => goToIndex(currentIndex - 1)}
              onNext={() => goToIndex(currentIndex + 1)}
            />
          )}
      </div>
    </>
  );
};

export default SingleProductPage;
