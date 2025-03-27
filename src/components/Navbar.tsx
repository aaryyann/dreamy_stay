
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Globe, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-primary font-bold text-2xl transition-transform duration-300 hover:scale-105"
          >
            StayFinder
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/stays" className="nav-link">Stays</Link>
              <Link to="/experiences" className="nav-link">Experiences</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          )}

          {/* Search Bar - Desktop */}
          {!isMobile && (
            <div className={cn(
              'hidden md:flex items-center transition-all duration-300 mx-4',
              isScrolled ? 'bg-secondary' : 'bg-white shadow-md',
              'rounded-full px-4 py-2 flex-shrink-0 hover:shadow-lg'
            )}>
              <button className="text-primary flex items-center text-sm font-medium">
                <span className="mr-2">Anywhere</span>
                <span className="h-4 w-px bg-gray-300 mx-2"></span>
                <span className="mr-2">Any week</span>
                <span className="h-4 w-px bg-gray-300 mx-2"></span>
                <span className="mr-2">Add guests</span>
                <div className="ml-2 bg-primary text-white p-1.5 rounded-full">
                  <Search size={16} />
                </div>
              </button>
            </div>
          )}

          {/* Right Side Menu */}
          <div className="flex items-center">
            {!isMobile && (
              <button className="nav-link flex items-center mr-2">
                <Globe size={18} className="mr-1" />
                <span>EN</span>
              </button>
            )}
            
            <div className={cn(
              'flex items-center rounded-full transition-all duration-200',
              isScrolled ? 'bg-secondary/80' : 'bg-white/90',
              'p-1.5 hover:shadow-md cursor-pointer'
            )}>
              {isMobile ? (
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              ) : (
                <>
                  <Menu size={18} className="mr-2" />
                  <div className="bg-primary text-white p-1 rounded-full">
                    <User size={18} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-slide-in">
            <div className="p-4 flex flex-col space-y-3">
              <Link to="/" className="block py-2 px-4 text-primary hover:bg-secondary rounded-md">Home</Link>
              <Link to="/stays" className="block py-2 px-4 text-primary hover:bg-secondary rounded-md">Stays</Link>
              <Link to="/experiences" className="block py-2 px-4 text-primary hover:bg-secondary rounded-md">Experiences</Link>
              <Link to="/about" className="block py-2 px-4 text-primary hover:bg-secondary rounded-md">About</Link>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center py-2 px-4 text-primary">
                  <Globe size={18} className="mr-2" />
                  <span>English (US)</span>
                </div>
                <div className="flex items-center py-2 px-4 text-primary">
                  <User size={18} className="mr-2" />
                  <span>Account</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
