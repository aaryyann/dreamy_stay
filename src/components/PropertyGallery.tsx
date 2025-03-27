
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  
  const handleShowFullGallery = (initialIndex: number = 0) => {
    setFullscreenImageIndex(initialIndex);
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseFullGallery = () => {
    setShowFullGallery(false);
    document.body.style.overflow = '';
  };
  
  const navigateFullGallery = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setFullscreenImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    } else {
      setFullscreenImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };
  
  return (
    <>
      {/* Normal gallery view */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
          {/* Main image - takes up 2 rows and 2 columns */}
          <div className="md:col-span-2 md:row-span-2 relative aspect-[1/1] md:aspect-auto">
            <img 
              src={images[0]} 
              alt={`${title} - Main view`} 
              className="w-full h-full object-cover"
              onClick={() => handleShowFullGallery(0)}
            />
          </div>
          
          {/* Secondary images */}
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className="hidden md:block relative aspect-square"
              onClick={() => handleShowFullGallery(index + 1)}
            >
              <img 
                src={image} 
                alt={`${title} - View ${index + 2}`} 
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
              />
              {index === 3 && images.length > 5 && (
                <div 
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                >
                  <div className="text-white flex items-center">
                    <Grid size={20} className="mr-2" />
                    <span className="font-medium">
                      Show all {images.length} photos
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Show all photos button for mobile */}
          <button 
            onClick={() => handleShowFullGallery(0)}
            className="md:hidden absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 text-sm font-medium flex items-center shadow-md"
          >
            <Grid size={16} className="mr-2" />
            Show all photos
          </button>
        </div>
      </div>
      
      {/* Fullscreen gallery modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 flex justify-between items-center">
            <button 
              onClick={handleCloseFullGallery}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-white text-sm">
              {fullscreenImageIndex + 1} / {images.length}
            </div>
            <div className="w-6" />
          </div>
          
          {/* Main gallery */}
          <div className="flex-1 flex items-center justify-center relative">
            <img 
              src={images[fullscreenImageIndex]} 
              alt={`${title} - View ${fullscreenImageIndex + 1}`} 
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Navigation buttons */}
            <button 
              onClick={() => navigateFullGallery('prev')}
              className="absolute left-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => navigateFullGallery('next')}
              className="absolute right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="py-4 px-6 bg-black/80">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
              {images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setFullscreenImageIndex(index)}
                  className={cn(
                    "cursor-pointer flex-shrink-0 w-20 h-20 rounded overflow-hidden transition-all duration-200",
                    fullscreenImageIndex === index ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
