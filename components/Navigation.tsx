import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ cartCount, onCartClick, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', value: 'home' },
    { name: 'Takeout Menu', value: 'menu' },
    { name: 'Catering', value: 'catering' },
    { name: 'Coupons', value: 'coupons' },
    { name: 'Gallery', value: 'gallery' },
    { name: 'Contact', value: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-40 font-sans transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-larosa-wood shadow-xl py-2' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <img 
               src="https://www.larosaspizzeria.com/wordpress/wp-content/themes/html5blank-stable/img/logo-larosas-pizzeria-west-hempstead.png" 
               alt={RESTAURANT_INFO.name}
               className={`transition-all duration-300 object-contain drop-shadow-md group-hover:scale-105 ${scrolled ? 'h-14' : 'h-20'}`}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                  currentPage === link.value 
                    ? 'text-larosa-gold border-b-2 border-larosa-gold' 
                    : scrolled ? 'text-gray-200 hover:text-larosa-gold' : 'text-white hover:text-larosa-gold drop-shadow-sm'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <button 
              onClick={onCartClick}
              className={`relative p-2 transition-colors duration-300 hover:text-larosa-gold ${scrolled ? 'text-gray-200' : 'text-white'}`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-larosa-wood transform translate-x-1/4 -translate-y-1/4 bg-larosa-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
             <button 
              onClick={onCartClick}
              className={`relative p-2 mr-4 ${scrolled ? 'text-white' : 'text-white'}`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-larosa-wood transform translate-x-1/4 -translate-y-1/4 bg-larosa-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none ${scrolled ? 'text-white' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-larosa-wood border-t border-larosa-gold/20 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  onNavigate(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-lg font-serif ${
                   currentPage === link.value ? 'bg-black/20 text-larosa-gold' : 'text-gray-100 hover:bg-black/10'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};