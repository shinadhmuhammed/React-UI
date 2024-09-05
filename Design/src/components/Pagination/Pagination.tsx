interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

  // Display only a window of page numbers
  const getPageWindow = () => {
    const window = 5; // Show 5 page numbers at a time
    const start = Math.max(1, currentPage - Math.floor(window / 2));
    const end = Math.min(totalPages, start + window - 1);
    return pageNumbers.slice(start - 1, end);
  };

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="hidden md:flex -space-x-px mx-2">
          {getPageWindow().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                pageNumber === currentPage
                  ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
