import React, { useState, useRef, useEffect } from 'react';
import { MENU_ITEMS } from '../constants';
import { Category, MenuItem, MenuSection, PriceVariant } from '../types';
import { Plus, Leaf, Flame, Star, Info, ChevronLeft, ChevronRight, Utensils, PartyPopper, Search, XCircle } from 'lucide-react';

interface MenuDisplayProps {
  onAddToCart: (item: MenuItem, variant?: PriceVariant) => void;
  defaultSection?: MenuSection;
}

export const MenuDisplay: React.FC<MenuDisplayProps> = ({ onAddToCart, defaultSection = 'Regular' }) => {
  const [activeSection, setActiveSection] = useState<MenuSection>(defaultSection);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, PriceVariant>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ vegetarian: false, spicy: false });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update active section if prop changes
  useEffect(() => {
    setActiveSection(defaultSection);
    setActiveCategory('All');
    setSearchQuery('');
  }, [defaultSection]);

  // Filter Logic
  const sectionItems = MENU_ITEMS.filter(item => item.section === activeSection);
  
  let displayedItems = sectionItems;

  // 1. Filter by Search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    displayedItems = displayedItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  } 
  // 2. Filter by Category (only if no search)
  else if (activeCategory !== 'All') {
    displayedItems = displayedItems.filter(item => item.category === activeCategory);
  }

  // 3. Filter by Tags (Veg/Spicy)
  if (filters.vegetarian) {
    displayedItems = displayedItems.filter(item => item.vegetarian);
  }
  if (filters.spicy) {
    displayedItems = displayedItems.filter(item => item.spicy);
  }

  // Get unique categories present in the current section
  const availableCategories = ['All', ...Array.from(new Set(sectionItems.map(item => item.category)))];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === 'left') {
        current.scrollBy({ left: -200, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }
  };

  const handleVariantChange = (itemId: string, variant: PriceVariant) => {
    setSelectedVariants(prev => ({ ...prev, [itemId]: variant }));
  };

  const handleAddItem = (item: MenuItem) => {
    if (item.variants && item.variants.length > 0) {
      const variant = selectedVariants[item.id] || item.variants[0];
      onAddToCart(item, variant);
    } else {
      onAddToCart(item);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="text-center mb-10 animate-fade-in-up">
        <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">Authentic Italian Cuisine</span>
        <h2 className="text-5xl font-serif font-bold text-larosa-wood mt-2 mb-6">
           {activeSection === 'Catering' ? 'Catering Menu' : 'Our Full Menu'}
        </h2>
        <div className="w-24 h-1 bg-larosa-gold mx-auto mb-6"></div>
      </div>

      {/* Controls Container */}
      <div className="max-w-5xl mx-auto mb-12 space-y-8">
        
        {/* Section Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-full inline-flex shadow-inner">
            <button
              onClick={() => { setActiveSection('Regular'); setActiveCategory('All'); }}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center ${
                activeSection === 'Regular'
                  ? 'bg-white text-larosa-wood shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Utensils className="w-4 h-4 mr-2" /> Regular
            </button>
            <button
              onClick={() => { setActiveSection('Catering'); setActiveCategory('All'); }}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center ${
                activeSection === 'Catering'
                  ? 'bg-white text-larosa-wood shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <PartyPopper className="w-4 h-4 mr-2" /> Catering
            </button>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search pizza, pasta, etc..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-larosa-tomato focus:ring-1 focus:ring-larosa-tomato transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilters(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors border ${
                filters.vegetarian 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Leaf className="w-4 h-4 mr-2" /> Vegetarian
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, spicy: !prev.spicy }))}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors border ${
                filters.spicy 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Flame className="w-4 h-4 mr-2" /> Spicy
            </button>
          </div>
        </div>
      </div>

      {/* Category Nav (Hidden if searching) */}
      {!searchQuery && (
        <div className="relative sticky top-20 z-30 mb-8">
           <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button onClick={() => scroll('left')} className="p-2 bg-white shadow-md rounded-full text-larosa-wood hover:bg-larosa-wood hover:text-white transition-colors border border-gray-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
           </div>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button onClick={() => scroll('right')} className="p-2 bg-white shadow-md rounded-full text-larosa-wood hover:bg-larosa-wood hover:text-white transition-colors border border-gray-200">
                <ChevronRight className="w-5 h-5" />
              </button>
           </div>
           
           <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-3 py-4 px-8 scrollbar-hide bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category | 'All')}
                className={`flex-shrink-0 px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full border whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-larosa-wood border-larosa-wood text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-larosa-tomato hover:text-larosa-tomato'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedItems.map((item, index) => {
             const hasVariants = item.variants && item.variants.length > 0;
             const currentVariant = hasVariants 
                ? (selectedVariants[item.id] || item.variants![0])
                : null;
             const displayPrice = currentVariant ? currentVariant.price : item.price;

             return (
              <div 
                key={item.id} 
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {item.popular && (
                    <div className="absolute top-4 left-4 z-20 bg-larosa-gold text-white text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-md rounded">
                      Customer Favorite
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold font-serif mb-1">{item.name}</h3>
                    <p className="text-larosa-gold font-bold text-xl">${displayPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    {item.vegetarian && (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase text-green-700 bg-green-50 px-2 py-1 rounded tracking-wider border border-green-100">
                        <Leaf className="w-3 h-3 mr-1" /> Veg
                      </span>
                    )}
                    {item.spicy && (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase text-red-700 bg-red-50 px-2 py-1 rounded tracking-wider border border-red-100">
                        <Flame className="w-3 h-3 mr-1" /> Spicy
                      </span>
                    )}
                    <span className="inline-flex items-center text-[10px] font-bold uppercase text-gray-500 bg-gray-50 px-2 py-1 rounded tracking-wider border border-gray-100">
                        {item.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
                  
                  {hasVariants && (
                     <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Option:</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:border-larosa-tomato"
                          value={currentVariant?.label}
                          onChange={(e) => {
                             const variant = item.variants?.find(v => v.label === e.target.value);
                             if (variant) handleVariantChange(item.id, variant);
                          }}
                        >
                           {item.variants!.map(v => (
                              <option key={v.label} value={v.label}>{v.label} - ${v.price.toFixed(2)}</option>
                           ))}
                        </select>
                     </div>
                  )}

                  <button
                    onClick={() => handleAddItem(item)}
                    className="w-full bg-gray-50 text-gray-900 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-larosa-tomato hover:text-white transition-all duration-300 flex items-center justify-center group-hover:shadow-lg border border-gray-200 hover:border-larosa-tomato"
                  >
                    Add to Order <Plus className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
             );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
          <button 
             onClick={() => { setSearchQuery(''); setFilters({vegetarian: false, spicy: false}); }}
             className="mt-6 text-larosa-tomato font-bold underline hover:text-red-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};