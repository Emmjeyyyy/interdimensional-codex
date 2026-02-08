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
    <div className="flex justify-center items-center space-x-1 md:space-x-2 mt-8 md:mt-12 py-4 md:py-6 border-t border-sci-frame/50 border-dashed">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 md:p-3 bg-sci-panel border border-sci-frame text-sci-text hover:text-sci-accent hover:border-sci-accent disabled:opacity-30 disabled:hover:border-sci-frame bevel-btn transition-all active:translate-y-px"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div className="flex space-x-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-hide px-2">
        {pages.map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2 md:px-3 py-1 text-sci-frameLight font-mono self-center text-xs md:text-sm">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[32px] h-8 md:min-w-[40px] md:h-10 px-2 font-mono font-bold text-xs md:text-sm transition-all bevel-btn active:translate-y-px ${
                currentPage === page
                  ? 'bg-sci-accent text-sci-base border border-sci-accent'
                  : 'bg-sci-panel text-sci-text border border-sci-frame hover:text-sci-accent hover:border-sci-accent'
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
        className="p-2 md:p-3 bg-sci-panel border border-sci-frame text-sci-text hover:text-sci-accent hover:border-sci-accent disabled:opacity-30 disabled:hover:border-sci-frame bevel-btn transition-all active:translate-y-px"
        aria-label="Next Page"
      >
        <ChevronRight size={20} className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default Pagination;