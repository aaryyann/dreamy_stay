
import { useState, useEffect } from 'react';
import Globe from './Globe';
import { ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('features-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="features-section"
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Explore Properties Worldwide
            </h2>
            <p 
              className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Find your perfect stay anywhere around the globe with our interactive search tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Globe container */}
            <div 
              className={`order-2 lg:order-1 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 shadow-2xl h-[500px] md:h-[600px]">
                <Globe />
              </div>
            </div>

            {/* Text content */}
            <div 
              className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="space-y-8 px-4">
                <div className="space-y-4">
                  <div className="inline-block p-2 bg-blue-100 rounded-lg">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg">
                      🌎
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Global Coverage</h3>
                  <p className="text-gray-600">
                    Find properties in over 190 countries and territories around the world, with 24/7 customer service.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-block p-2 bg-green-100 rounded-lg">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-lg">
                      🔍
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Smart Search</h3>
                  <p className="text-gray-600">
                    Our intelligent filters help you find exactly what you're looking for, whether it's beachfront villas or urban lofts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-block p-2 bg-purple-100 rounded-lg">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-lg">
                      ⭐
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Verified Reviews</h3>
                  <p className="text-gray-600">
                    Real reviews from real guests who have experienced the properties firsthand.
                  </p>
                </div>

                <button className="group inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium transition-all hover:bg-gray-800">
                  Explore all destinations
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
