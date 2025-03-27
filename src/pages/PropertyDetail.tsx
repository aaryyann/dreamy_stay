
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Share, Wifi, Tv, CookingPot, AirVent, Coffee, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PropertyGallery from '@/components/PropertyGallery';
import Footer from '@/components/Footer';
import { properties } from '@/lib/data';
import { cn } from '@/lib/utils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties.find(p => p.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If property not found
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Property not found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleDateSelect = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      if (selectedDates.length < 2) {
        const newDates = [...selectedDates, date].sort();
        setSelectedDates(newDates);
      } else {
        setSelectedDates([date]);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {isLoading ? (
            // Loading skeleton
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Back button and actions */}
              <div className="flex justify-between items-center mb-6">
                <Link to="/" className="flex items-center text-primary font-medium">
                  <ArrowLeft size={18} className="mr-2" />
                  Back to results
                </Link>
                
                <div className="flex items-center space-x-4">
                  <button 
                    className="flex items-center text-gray-700 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => {/* Share functionality */}}
                  >
                    <Share size={18} className="mr-2" />
                    Share
                  </button>
                  
                  <button 
                    className={cn(
                      "flex items-center text-sm font-medium transition-colors",
                      isFavorite ? "text-red-500" : "text-gray-700 hover:text-primary"
                    )}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart size={18} className="mr-2" fill={isFavorite ? "#ef4444" : "none"} />
                    {isFavorite ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
              
              {/* Property name and rating */}
              <h1 className="text-3xl font-semibold mb-2 animate-fade-in">{property.title}</h1>
              
              <div className="flex items-center justify-between mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center text-gray-700">
                  <Star size={18} className="mr-1 text-primary fill-current" />
                  <span className="font-medium mr-1">{property.rating}</span>
                  <span className="text-gray-500 mr-3">•</span>
                  <span className="text-gray-500 underline">{Math.round(property.rating * 20)} reviews</span>
                  <span className="text-gray-500 mx-3">•</span>
                  <span>{property.location}</span>
                </div>
                
                {property.superhost && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    SUPERHOST
                  </span>
                )}
              </div>
              
              {/* Property gallery */}
              <div className="mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <PropertyGallery images={property.gallery} title={property.title} />
              </div>
              
              {/* Main content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
                {/* Left column - Property details */}
                <div className="col-span-2">
                  {/* Host info */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        Entire {property.beds > 2 ? 'home' : 'apartment'} hosted by {property.host.name}
                      </h2>
                      <p className="text-gray-600">
                        {property.beds} {property.beds === 1 ? 'bed' : 'beds'} • {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src={property.host.image} 
                        alt={property.host.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.amenities.slice(0, 8).map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {amenity.includes('Wifi') && <Wifi size={20} className="mr-4 text-gray-600" />}
                          {amenity.includes('TV') && <Tv size={20} className="mr-4 text-gray-600" />}
                          {amenity.includes('Kitchen') && <CookingPot size={20} className="mr-4 text-gray-600" />}
                          {amenity.includes('Air') && <AirVent size={20} className="mr-4 text-gray-600" />}
                          {!amenity.includes('Wifi') && !amenity.includes('TV') && !amenity.includes('Kitchen') && !amenity.includes('Air') && (
                            <Coffee size={20} className="mr-4 text-gray-600" />
                          )}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    {property.amenities.length > 8 && (
                      <button className="mt-4 px-4 py-2 border border-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Show all {property.amenities.length} amenities
                      </button>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">About this space</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>
                
                {/* Right column - Booking card */}
                <div className="relative">
                  <div className="sticky top-28 glass-card rounded-2xl overflow-hidden shadow-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xl font-semibold">${property.price}</span>
                        <span className="text-gray-600"> night</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-primary fill-current" />
                        <span className="font-medium mr-1">{property.rating}</span>
                        <span className="text-gray-500 text-sm">({Math.round(property.rating * 20)} reviews)</span>
                      </div>
                    </div>
                    
                    {/* Date picker */}
                    <div className="mb-4">
                      <div className="grid grid-cols-2 rounded-t-lg overflow-hidden border border-gray-300 mb-2">
                        <div className="p-3 border-r border-gray-300">
                          <div className="text-xs text-gray-500 font-medium">CHECK-IN</div>
                          <div className="text-sm mt-1">
                            {selectedDates[0] || 'Add date'}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-gray-500 font-medium">CHECKOUT</div>
                          <div className="text-sm mt-1">
                            {selectedDates[1] || 'Add date'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Simple calendar UI */}
                      <div className="mb-4 border border-gray-300 rounded-lg p-4">
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {[...Array(31)].map((_, idx) => {
                            const day = idx + 1;
                            const date = `July ${day}`;
                            const isSelected = selectedDates.includes(date);
                            const isStart = selectedDates[0] === date;
                            const isEnd = selectedDates[1] === date;
                            
                            return (
                              <button
                                key={idx}
                                className={cn(
                                  "h-8 w-full rounded-full text-sm flex items-center justify-center transition-all duration-200",
                                  isSelected
                                    ? "bg-primary text-white"
                                    : "hover:bg-gray-100",
                                  isStart && "bg-primary text-white",
                                  isEnd && "bg-primary text-white"
                                )}
                                onClick={() => handleDateSelect(date)}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Guests */}
                      <div className="border border-gray-300 rounded-lg p-3 mb-4">
                        <div className="text-xs text-gray-500 font-medium">GUESTS</div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm">
                            1 guest
                          </div>
                          <User size={16} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Call to action */}
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors">
                      Reserve
                    </button>
                    
                    <p className="text-center text-sm text-gray-500 mt-4">
                      You won't be charged yet
                    </p>
                    
                    {/* Price breakdown */}
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 underline">${property.price} x 5 nights</span>
                        <span>${property.price * 5}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 underline">Cleaning fee</span>
                        <span>${Math.round(property.price * 0.15)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 underline">Service fee</span>
                        <span>${Math.round(property.price * 0.12)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 font-semibold">
                        <span>Total before taxes</span>
                        <span>${property.price * 5 + Math.round(property.price * 0.15) + Math.round(property.price * 0.12)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
