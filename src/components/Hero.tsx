
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import SearchBar from '@/components/SearchBar';
import { floatAnimation } from '@/lib/animations';
import HeroScene from './HeroScene';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxStyles, setParallaxStyles] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Simple parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY;
      const translateY = scrollPos * 0.3; // Parallax intensity
      setParallaxStyles({
        transform: `translate3d(0, ${translateY}px, 0)`,
      });
    };
    
    // Track mouse position for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate 3D tilt effect based on mouse position
  const getTiltStyle = (factor: number = 1) => {
    return {
      transform: `perspective(1000px) rotateX(${mousePosition.y * 2 * factor}deg) rotateY(${mousePosition.x * 5 * factor}deg)`
    };
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-[-1]">
        <HeroScene />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-[-1]"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-white text-3xl md:text-4xl lg:text-heading-1 font-bold mb-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getTiltStyle(0.3)}
          >
            Find Your Perfect Stay
          </h2>
          <p 
            className={`text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover unique places to stay around the world
          </p>
          
          {/* Search Bar */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getTiltStyle(0.2)}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 z-[-1] transition-opacity duration-300 group-hover:opacity-70"></div>
            <SearchBar />
          </div>

          {/* 3D Floating Cards */}
          <div className="hidden md:flex justify-center mt-16 gap-6 perspective-1000">
            <div 
              className={`glass-card p-6 rounded-lg shadow-xl transition-all duration-700 delay-300 group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                ...getTiltStyle(1),
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="text-4xl mb-2 transform translate-z-20" style={{ transform: 'translateZ(20px)' }}>🏠</div>
              <h3 className="text-white text-lg font-semibold mb-1 transform translate-z-10" style={{ transform: 'translateZ(10px)' }}>Entire homes</h3>
              <p className="text-white/80 text-sm transform translate-z-5" style={{ transform: 'translateZ(5px)' }}>Comfortable private places</p>
            </div>
            <div 
              className={`glass-card p-6 rounded-lg shadow-xl transition-all duration-700 delay-400 group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                ...getTiltStyle(1.2),
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="text-4xl mb-2 transform translate-z-20" style={{ transform: 'translateZ(20px)' }}>🌊</div>
              <h3 className="text-white text-lg font-semibold mb-1 transform translate-z-10" style={{ transform: 'translateZ(10px)' }}>Unique stays</h3>
              <p className="text-white/80 text-sm transform translate-z-5" style={{ transform: 'translateZ(5px)' }}>Spaces that are more than just a place to sleep</p>
            </div>
            <div 
              className={`glass-card p-6 rounded-lg shadow-xl transition-all duration-700 delay-500 group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                ...getTiltStyle(0.8),
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="text-4xl mb-2 transform translate-z-20" style={{ transform: 'translateZ(20px)' }}>🏙️</div>
              <h3 className="text-white text-lg font-semibold mb-1 transform translate-z-10" style={{ transform: 'translateZ(10px)' }}>Urban adventures</h3>
              <p className="text-white/80 text-sm transform translate-z-5" style={{ transform: 'translateZ(5px)' }}>Explore the city life</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium 
        transition-all duration-700 delay-700 cursor-pointer ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <ScrollLink 
          to="listings" 
          spy={true} 
          smooth={true} 
          offset={-100} 
          duration={800}
          className="flex flex-col items-center"
        >
          <span className="mb-2">Scroll down</span>
          <ChevronDown className="animate-bounce" size={20} />
        </ScrollLink>
      </div>
    </div>
  );
};

export default Hero;
