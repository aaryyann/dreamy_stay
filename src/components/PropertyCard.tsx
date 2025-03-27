
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyType } from '@/lib/data';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyType;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.gallery.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.gallery.length - 1 : prev - 1
    );
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Animation delay based on index
  const delayClass = `animate-delayed animate-fade-in`;
  const delayStyle = { '--delay': `${index * 100}ms` } as React.CSSProperties;
  
  return (
    <Link 
      to={`/property/${property.id}`}
      style={delayStyle}
      className={cn(
        "block opacity-0 group",
        delayClass,
        "hover-card relative rounded-xl overflow-hidden transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image gallery */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-xl">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-shimmer" 
            style={{
              backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
              backgroundSize: '700px 100%', 
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        <img
          ref={imgRef}
          src={property.gallery[currentImageIndex]}
          alt={property.title}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Navigation arrows - only shown on hover */}
        {isHovered && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md hover:scale-110 transition-transform duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md hover:scale-110 transition-transform duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
        
        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
            isFavorite ? "text-red-500 bg-white shadow-md" : "text-white bg-black/30 hover:bg-white/90 hover:text-gray-700"
          )}
        >
          <Heart size={18} fill={isFavorite ? "#ef4444" : "none"} />
        </button>
        
        {/* Superhost badge */}
        {property.superhost && (
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-md text-xs font-medium">
            SUPERHOST
          </div>
        )}
        
        {/* Image pagination dots */}
        {property.gallery.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.gallery.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200",
                  currentImageIndex === idx ? "bg-white w-4" : "bg-white/60"
                )}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      {/* Property info */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>
          <div className="flex items-center text-sm ml-2">
            <Star size={14} className="fill-current text-primary" />
            <span className="ml-1">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{property.location}</p>
        <div className="flex items-center text-sm space-x-1">
          <span className="font-medium">{property.beds} beds</span>
          <span className="text-gray-400">•</span>
          <span className="font-medium">{property.baths} baths</span>
        </div>
        <p className="pt-1 text-sm">
          <span className="font-semibold">${property.price}</span>
          <span className="text-gray-500"> night</span>
        </p>
      </div>
    </Link>
  );
};

export default PropertyCard;
