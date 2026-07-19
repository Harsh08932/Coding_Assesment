import { useNavigate, useSearchParams } from "react-router-dom";
import RatingStar from "./RatingStar";
import capitalizeFirstLetter from "./../../utils/helper";

const ProductCard = ({ product, productIds }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    navigate(`/product/${product.id}`, {
      state: { productIds, filters: Object.fromEntries(searchParams) },
    });
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="bg-base-100 card w-full rounded-md shadow-md hover:shadow-2xl transition duration-300"
      >
        <figure className="px-4 pt-3">
          <img
            src={product.thumbnail}
            className="object-cover rounded-lg h-64 md:h-48 w-full"
            alt={product.title}
          />
        </figure>

        <div className="px-4 py-2">
          <h3 className="text-lg font-bold ml-4">{`${capitalizeFirstLetter(product.category)}`}</h3>
          <div className="flex items-start justify-between mt-2">
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <RatingStar ratingValue={product.rating} className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
