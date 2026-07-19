const ProductNav = ({ hasPrev, hasNext, onPrev, onNext }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        disabled={!hasPrev}
        onClick={onPrev}
        className="px-4 py-2 border rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>
      <button
        disabled={!hasNext}
        onClick={onNext}
        className="px-4 py-2 border rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
};

export default ProductNav;
