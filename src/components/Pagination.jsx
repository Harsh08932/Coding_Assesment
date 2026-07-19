

const Pagination = ({page, totalPages,  onPageChange}) => {
  return (
    <div className="flex item-center justify-center gap-4 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

    <span className="text-sm">Page {page} of {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;