
import { useState } from 'react';
import { Search, Users, Calendar } from 'lucide-react';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  
  return (
    <div 
      className={`max-w-4xl mx-auto transition-all duration-300 ${
        focused 
          ? 'bg-white shadow-2xl rounded-2xl scale-105' 
          : 'bg-white/90 shadow-lg rounded-full'
      }`}
    >
      <div className={`flex ${focused ? 'flex-col md:flex-row' : 'flex-row'} items-center w-full`}>
        <div 
          className={`flex items-center flex-1 ${
            focused ? 'border-b md:border-b-0 md:border-r border-gray-200 p-5' : 'pl-6 py-3'
          }`}
          onClick={() => setFocused(true)}
        >
          <Search className="text-primary w-5 h-5 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <div className="text-xs font-semibold text-gray-800">Location</div>
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full text-gray-700 bg-transparent border-none focus:outline-none text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setFocused(true)}
            />
          </div>
        </div>
        
        {focused && (
          <>
            <div 
              className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-5"
              onClick={() => setFocused(true)}
            >
              <Calendar className="text-primary w-5 h-5 flex-shrink-0" />
              <div className="ml-4 flex-1">
                <div className="text-xs font-semibold text-gray-800">Check in / Check out</div>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full text-gray-700 bg-transparent border-none focus:outline-none text-sm"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  onFocus={() => setFocused(true)}
                />
              </div>
            </div>
            
            <div 
              className="flex items-center flex-1 p-5"
              onClick={() => setFocused(true)}
            >
              <Users className="text-primary w-5 h-5 flex-shrink-0" />
              <div className="ml-4 flex-1">
                <div className="text-xs font-semibold text-gray-800">Guests</div>
                <input
                  type="text"
                  placeholder="Add guests"
                  className="w-full text-gray-700 bg-transparent border-none focus:outline-none text-sm"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  onFocus={() => setFocused(true)}
                />
              </div>
            </div>
          </>
        )}
        
        <div className={`${focused ? 'p-5' : 'pr-1'}`}>
          <button 
            className="bg-primary hover:bg-primary/90 transition-all duration-200 text-white rounded-full p-3 md:p-4 flex items-center justify-center shadow-md hover:shadow-lg"
            onClick={() => setFocused(false)}
          >
            <Search className="w-5 h-5" />
            {focused && <span className="ml-2 font-medium hidden md:inline">Search</span>}
          </button>
        </div>
      </div>
      
      {focused && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setFocused(false)}
        ></div>
      )}
    </div>
  );
};

export default SearchBar;
