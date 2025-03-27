
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Help Center</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Safety information</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Cancellation options</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Supporting people with disabilities</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Report a neighborhood concern</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Community forum</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Support refugees</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Combating discrimination</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Invite friends</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Gift cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Try hosting</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">AirCover for Hosts</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Explore hosting resources</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Visit our community forum</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">How to host responsibly</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">StayFinder</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Newsroom</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Learn about new features</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Letter from our founders</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary text-sm">Investors</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-6">
                <Link to="#" className="text-gray-600 hover:text-primary">
                  <Facebook size={20} />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary">
                  <Twitter size={20} />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">© 2023 StayFinder, Inc.</span>
              </div>
              
              <Link to="#" className="text-sm text-gray-600 hover:text-primary">Privacy</Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-primary">Terms</Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-primary">Sitemap</Link>
              
              <div className="flex items-center">
                <Globe size={16} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">English (US)</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            This site is a demo project. It's not a real booking platform, and no actual bookings or transactions can be made.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
