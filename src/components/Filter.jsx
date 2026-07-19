import { useState } from "react";

const Filter = ({
  categories,
  availableBrands,
  onFilterChange,
  initialCategory = [],
  initialMinPrice = "",
  initialMaxPrice = "",
  initialBrands = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);

  
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const updated = selectedCategory.includes(value)
      ? selectedCategory.filter((c) => c !== value)
      : [...selectedCategory, value];

  

    setSelectedCategory(updated);

    onFilterChange({
      category: updated,
      minPrice,
      maxPrice,
      brands: selectedBrands,
    });
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    const updated = selectedBrands.includes(value)
      ? selectedBrands.filter((br) => br !== value)
      : [...selectedBrands, value];

    setSelectedBrands(updated);
    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
      brands: updated,
    });
  };

  const applyPriceFilter = () => {
    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
      brands: selectedBrands,
    });
  };

  return (
    <>
      <aside className="w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
        {/* Category Filter */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Categories</h4>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategory.includes(category)}
                  onChange={() =>
                    handleCategoryChange({ target: { value: category } })
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-5">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Price Range
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
              className="w-full border rounded px-2 py-1.5 text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              className="w-full border rounded px-2 py-1.5 text-sm"
            />
          </div>
          <button
            className="mt-3 w-full bg-blue-600 text-white rounded py-2 text-sm font-medium"
            onClick={applyPriceFilter}
          >
            Apply
          </button>
        </div>

        {/* Brands */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Brand</h4>
          <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto">
            {availableBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    handleBrandChange({ target: { value: brand } })
                  }
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filter;
