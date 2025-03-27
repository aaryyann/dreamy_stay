
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [pages, setPages] = useState<(number | string)[]>([]);
  
  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Create pagination array with ellipsis
    const createPaginationArray = (current: number, max: number) => {
      if (max <= 7) {
        // If 7 or fewer pages, show all pages
        return Array.from({ length: max }, (_, i) => i + 1);
      }
      
      // Always include first and last page, and pages around current page
      const result: (number | string)[] = [1];
      
      if (current <= 3) {
        // Near start
        result.push(2, 3, 4, '...', max);
      } else if (current >= max - 2) {
        // Near end
        result.push('...', max - 3, max - 2, max - 1, max);
      } else {
        // Middle
        result.push('...', current - 1, current, current + 1, '...', max);
      }
      
      return result;
    };
    
    setPages(createPaginationArray(currentPage, totalPages));
  }, [totalItems, itemsPerPage, currentPage]);
  
  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <div className="flex items-center justify-center mt-8 space-x-1">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-full flex items-center justify-center transition-colors",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <ChevronLeft size={18} />
      </button>
      
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full text-sm transition-all duration-200",
            page === currentPage
              ? "bg-primary text-white font-medium shadow-sm"
              : page === '...'
              ? "text-gray-500 cursor-default"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={handleNext}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        className={cn(
          "p-2 rounded-full flex items-center justify-center transition-colors",
          currentPage === Math.ceil(totalItems / itemsPerPage)
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
