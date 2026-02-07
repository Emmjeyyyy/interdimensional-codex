import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift(-1); // -1 represents ellipsis
    if (currentPage + delta < totalPages - 1) range.push(-1);

    range.unshift(1);
    if (totalPages !== 1) range.push(totalPages);

    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-black/50 border border-rm-green/30 text-rm-green hover:bg-rm-green hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-rm-green transition-all"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-hide">
        {pages.map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500 self-center">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-bold font-display transition-all ${
                currentPage === page
                  ? 'bg-rm-neon text-black shadow-[0_0_10px_rgba(20,240,60,0.5)]'
                  : 'bg-black/50 border border-rm-green/30 text-gray-300 hover:border-rm-neon hover:text-rm-neon'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-black/50 border border-rm-green/30 text-rm-green hover:bg-rm-green hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-rm-green transition-all"
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;