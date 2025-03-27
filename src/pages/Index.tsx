
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import FeaturesSection from '@/components/FeaturesSection';
import { properties } from '@/lib/data';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 8;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const listingsRef = useRef<HTMLDivElement>(null);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
    // Scroll to listings section when changing pages
    if (listingsRef.current) {
      listingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ThreeJSBackground />
      <Hero />
      
      <FeaturesSection />
      
      <main className="flex-1">
        <div 
          id="listings" 
          ref={listingsRef} 
          className={cn(
            "relative transition-all duration-500 ease-out-expo pt-16",
            isScrolled ? "bg-white" : "bg-transparent"
          )}
        >
          {/* Top gradient overlay */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none transition-opacity duration-500",
            isScrolled ? "opacity-0" : "opacity-100"
          )}></div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <Filters />
            
            {/* Property Listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  index={index}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination 
              totalItems={properties.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
