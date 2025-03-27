
import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sliders } from 'lucide-react';
import { FilterType, propertyTypes } from '@/lib/data';
import { cn } from '@/lib/utils';

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleFilterClick = (filterId: string) => {
    if (selectedFilter === filterId) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filterId);
    }
  };
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Add horizontal scroll with mouse wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <div className="relative mb-8 mt-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 overflow-hidden">
            {/* Gradient on the left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            
            {/* Scroll buttons */}
            <button 
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            
            <button 
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Filter chips */}
            <div 
              ref={scrollContainerRef} 
              className="flex items-center space-x-3 overflow-x-auto scrollbar-hide py-2 px-10"
            >
              {propertyTypes.map((filter) => (
                <FilterButton
                  key={filter.id}
                  filter={filter}
                  isSelected={selectedFilter === filter.id}
                  onClick={() => handleFilterClick(filter.id)}
                />
              ))}
            </div>
            
            {/* Gradient on the right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
          
          {/* Advanced filters button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="ml-4 flex items-center bg-white px-4 py-2 rounded-full border border-gray-300 text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
          >
            <Sliders size={16} className="mr-2" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Advanced Filters Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">All filters</h3>
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <h4 className="text-base font-medium mb-3">Price range</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="text" 
                        placeholder="Min" 
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="text" 
                        placeholder="Max" 
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Rooms and beds */}
                <div>
                  <h4 className="text-base font-medium mb-3">Rooms and beds</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm text-gray-700 mb-2">Bedrooms</h5>
                      <div className="flex space-x-2">
                        {['Any', '1', '2', '3', '4', '5+'].map((num) => (
                          <button 
                            key={num} 
                            className="px-5 py-2 rounded-full border border-gray-300 text-sm hover:border-gray-900 transition-colors"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm text-gray-700 mb-2">Beds</h5>
                      <div className="flex space-x-2">
                        {['Any', '1', '2', '3', '4', '5+'].map((num) => (
                          <button 
                            key={num} 
                            className="px-5 py-2 rounded-full border border-gray-300 text-sm hover:border-gray-900 transition-colors"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm text-gray-700 mb-2">Bathrooms</h5>
                      <div className="flex space-x-2">
                        {['Any', '1', '2', '3', '4', '5+'].map((num) => (
                          <button 
                            key={num} 
                            className="px-5 py-2 rounded-full border border-gray-300 text-sm hover:border-gray-900 transition-colors"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Amenities */}
                <div>
                  <h4 className="text-base font-medium mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 
                      'Heating', 'Self check-in', 'Pool', 'Hot tub', 'Free parking'
                    ].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-0" />
                        <span className="ml-2 text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-primary underline font-medium"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface FilterButtonProps {
  filter: FilterType;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton = ({ filter, isSelected, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 min-w-[80px]",
        isSelected 
          ? "bg-primary text-white shadow-md" 
          : "bg-white text-gray-700 border border-gray-200 hover:shadow"
      )}
    >
      <span className="text-xl mb-1">{filter.icon}</span>
      <span className="text-xs font-medium whitespace-nowrap">{filter.name}</span>
    </button>
  );
};

export default Filters;
