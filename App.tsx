import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MenuDisplay } from './components/MenuDisplay';
import { Atmosphere } from './components/Atmosphere';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { ChatBot } from './components/ChatBot';
import { EmployeePortal } from './components/EmployeePortal';
import { Careers } from './components/Careers';
import { MenuItem, CartItem, PriceVariant } from './types';
import { MapPin, Phone, Clock, Facebook, Instagram, Lock, Mail, X, ZoomIn, Scissors } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const addToCart = (item: MenuItem, variant?: PriceVariant) => {
    const effectivePrice = variant ? variant.price : item.price;
    // Create unique ID based on item ID and selected variant label (if any)
    const cartId = item.id + (variant ? `-${variant.label}` : '');

    setCartItems(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        ...item,
        cartId,
        quantity: 1,
        selectedVariant: variant,
        price: effectivePrice // Override base price with variant price
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.cartId === cartId) {
        return { ...i, quantity: Math.max(1, i.quantity + delta) };
      }
      return i;
    }));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If on employee portal, render without standard nav/footer
  if (currentPage === 'employee') {
    return (
      <>
        <div className="absolute top-4 left-4 z-50">
           <button onClick={() => setCurrentPage('home')} className="text-gray-500 hover:text-gray-900 underline text-sm">
             &larr; Back to Website
           </button>
        </div>
        <EmployeePortal />
      </>
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'menu':
        return (
          <>
            <div className="h-20 bg-larosa-wood"></div> {/* Spacer for fixed nav */}
            <MenuDisplay onAddToCart={addToCart} defaultSection="Regular" />
          </>
        );
      case 'catering':
        return (
           <div className="bg-white min-h-screen pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                   <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">Special Events</span>
                   <h2 className="text-4xl font-serif font-bold text-larosa-wood mt-2 mb-4">Catering for All Occasions</h2>
                   <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                     We specialize in catering for office parties, holidays, birthdays, and any special event. 
                     Half Trays serve 6-8 people. Full Trays serve 12-15 people.
                   </p>
                   
                   <div className="bg-larosa-cream p-6 rounded-xl border border-larosa-gold/20 max-w-2xl mx-auto mb-12">
                      <p className="text-center font-bold text-larosa-wood">
                        Call {RESTAURANT_INFO.phone} to discuss your event menu!
                      </p>
                   </div>
                 </div>
                 <MenuDisplay onAddToCart={addToCart} defaultSection="Catering" />
              </div>
           </div>
        );
      case 'coupons':
        // Featured items for the coupons page
        const featuredIds = ['piz3', 'pas5', 'parm1']; // Grandma Pie, Penne Vodka, Chicken Parm
        const featuredItems = MENU_ITEMS.filter(item => featuredIds.includes(item.id));

        return (
          <div className="bg-larosa-cream min-h-screen pt-20">
             {/* Hero Banner */}
             <div className="bg-larosa-wood relative overflow-hidden text-white py-20 px-4">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
                   <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-md">
                     Exclusive Offers
                   </h2>
                   <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                      Enjoy the authentic taste of LaRosa's for less. Mention these coupons when placing your order by phone or at the counter.
                   </p>
                </div>
             </div>

             <div className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Coupons Section */}
                <div className="grid lg:grid-cols-2 gap-10 mb-24 max-w-5xl mx-auto">
                   
                   {/* Coupon 1 */}
                   <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-100">
                      <div className="bg-larosa-tomato p-8 md:w-1/3 flex flex-col items-center justify-center text-white text-center relative border-r-2 border-dashed border-white/30">
                          {/* Ticket edge effect */}
                          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 hidden md:block"></div>
                          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 md:hidden"></div>
                          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 md:hidden"></div>

                          <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-90">Special</span>
                          <div className="text-4xl font-serif font-bold mb-2">$18.95</div>
                          <span className="text-sm font-medium opacity-90">plus tax</span>
                      </div>
                      <div className="p-8 md:w-2/3 relative bg-white flex flex-col justify-center">
                          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 hidden md:block"></div>
                          
                          <h3 className="text-2xl font-bold text-larosa-wood mb-2 font-serif">Monday Madness</h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            Large Cheese Pie. The perfect cure for the Monday blues.
                            <span className="block text-xs text-gray-400 mt-1 italic">*Toppings extra. Pick-up only.</span>
                          </p>
                          
                          <div className="mt-auto border-t border-dashed border-gray-200 pt-4 flex justify-between items-center text-sm">
                             <div className="flex items-center text-larosa-tomato font-bold">
                               <Scissors className="w-4 h-4 mr-2" />
                               <span>Use Code: MONDAY18</span>
                             </div>
                             <span className="text-gray-400 text-xs uppercase font-bold">Exp: Never</span>
                          </div>
                      </div>
                   </div>

                   {/* Coupon 2 */}
                   <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-200">
                      <div className="bg-larosa-wood p-8 md:w-1/3 flex flex-col items-center justify-center text-white text-center relative border-r-2 border-dashed border-white/30">
                          {/* Ticket edge effect */}
                          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 hidden md:block"></div>
                          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 md:hidden"></div>
                          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 md:hidden"></div>

                          <span className="text-xs font-bold uppercase tracking-widest mb-2 text-larosa-gold">Bundle</span>
                          <div className="text-4xl font-serif font-bold mb-2">$54.95</div>
                          <span className="text-sm font-medium text-gray-300">plus tax</span>
                      </div>
                      <div className="p-8 md:w-2/3 relative bg-white flex flex-col justify-center">
                          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-larosa-cream rounded-full z-10 hidden md:block"></div>
                          
                          <h3 className="text-2xl font-bold text-larosa-wood mb-2 font-serif">Family Feast</h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            2 Large Pies, Baked Ziti, Garlic Knots & 2L Soda.
                            <span className="block text-xs text-gray-400 mt-1 italic">*Feeds 6-8 hungry people.</span>
                          </p>
                          
                          <div className="mt-auto border-t border-dashed border-gray-200 pt-4 flex justify-between items-center text-sm">
                             <div className="flex items-center text-larosa-wood font-bold">
                               <Scissors className="w-4 h-4 mr-2" />
                               <span>Use Code: FAMILY54</span>
                             </div>
                             <span className="text-gray-400 text-xs uppercase font-bold">Best Value</span>
                          </div>
                      </div>
                   </div>

                </div>

                {/* Featured Dishes Section */}
                <div className="border-t border-larosa-gold/20 pt-16">
                    <div className="text-center mb-12 animate-fade-in-up">
                       <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">Chef's Selections</span>
                       <h3 className="text-4xl font-serif font-bold text-larosa-wood mt-2">Local Favorites</h3>
                       <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                         Don't have a coupon code? You can't go wrong with these West Hempstead classics.
                       </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                       {featuredItems.map((item, index) => (
                          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                             <div className="h-56 overflow-hidden relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                {item.popular && (
                                   <div className="absolute top-4 left-4 bg-larosa-gold text-white text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-md rounded">
                                      Popular
                                   </div>
                                )}
                             </div>
                             <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                   <h4 className="font-serif font-bold text-xl text-gray-900 group-hover:text-larosa-tomato transition-colors">{item.name}</h4>
                                   <span className="font-bold text-lg text-gray-700">${item.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{item.description}</p>
                                <button 
                                  onClick={() => addToCart(item)}
                                  className="w-full py-3 border-2 border-gray-100 text-gray-700 font-bold rounded-lg uppercase text-xs tracking-wider hover:border-larosa-tomato hover:bg-larosa-tomato hover:text-white transition-all"
                                >
                                   Add to Order
                                </button>
                             </div>
                          </div>
                       ))}
                    </div>
                </div>

             </div>
          </div>
        );
      case 'gallery':
         return (
           <div className="bg-white min-h-screen pt-32 pb-12">
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-4xl font-serif font-bold text-larosa-wood mb-12">Our Gallery</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-4-1.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-1.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-2.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-3.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-5.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-6.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-7.jpg",
                      "https://www.larosaspizzeria.com/wordpress/wp-content/uploads/2022/02/pic-gallery-8.jpg",
                      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80",
                    ].map((src, idx) => (
                       <div key={idx} className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-md" onClick={() => setSelectedImage(src)}>
                          <img 
                            src={src} 
                            onError={(e) => {
                              // If image fails to load, try a reliable backup from Unsplash
                              // This ensures empty/missing files don't break layout
                              e.currentTarget.src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80";
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            alt="Gallery" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <ZoomIn className="text-white w-8 h-8" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                   <img src={selectedImage} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" alt="Full size" />
                   <button className="absolute top-4 right-4 text-white hover:text-gray-300">
                      <X className="w-8 h-8" />
                   </button>
                </div>
              )}
           </div>
         );
      case 'contact':
        return (
          <div className="bg-gray-50 min-h-screen pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-8 md:p-12">
                     <h2 className="text-4xl font-serif font-bold text-larosa-wood mb-6">Contact Us</h2>
                     <div className="space-y-6">
                        <div className="flex items-start">
                           <MapPin className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                           <div>
                              <h3 className="font-bold text-gray-900">Address</h3>
                              <p className="text-gray-600">{RESTAURANT_INFO.address}</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <Phone className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                           <div>
                              <h3 className="font-bold text-gray-900">Phone</h3>
                              <p className="text-gray-600">{RESTAURANT_INFO.phone}</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <Mail className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                           <div>
                              <h3 className="font-bold text-gray-900">Email</h3>
                              <p className="text-gray-600">{RESTAURANT_INFO.email}</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <Clock className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                           <div>
                              <h3 className="font-bold text-gray-900">Hours</h3>
                              <p className="text-gray-600 whitespace-pre-line">{RESTAURANT_INFO.hours.replace(/ \| /g, '\n')}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="bg-gray-200 h-96 md:h-auto relative min-h-[300px]">
                     <iframe 
                        src="https://maps.google.com/maps?q=504+Hempstead+Turnpike,+West+Hempstead,+NY+11552&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                     ></iframe>
                  </div>
               </div>
               
               <div className="mt-12 text-center">
                  <Careers />
               </div>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onOrderNow={() => setCurrentPage('menu')} />
            <Atmosphere />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navigation 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      {renderContent()}

      {/* Footer */}
      <footer className="bg-larosa-wood text-white py-12 border-t border-larosa-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">LaRosa's</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Authentic Italian cuisine and the best pizza in West Hempstead since 1985. Family owned and operated.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.facebook.com/LaRosasRestaurantPizzeria/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.instagram.com/LaRosasRestaurantPizzeria/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-larosa-gold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentPage('menu')} className="hover:text-white">Order Online</button></li>
                <li><button onClick={() => setCurrentPage('catering')} className="hover:text-white">Catering</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-larosa-gold uppercase tracking-wider text-sm mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 504 Hempstead Tpke</li>
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {RESTAURANT_INFO.phone}</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {RESTAURANT_INFO.email}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-larosa-gold uppercase tracking-wider text-sm mb-4">Hours</h4>
              <p className="text-sm text-gray-400 whitespace-pre-line">{RESTAURANT_INFO.hours.replace(/ \| /g, '\n')}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                 <button onClick={() => setCurrentPage('employee')} className="flex items-center text-xs text-gray-600 hover:text-gray-400 transition-colors">
                   <Lock className="w-3 h-3 mr-1" /> Staff Login
                 </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} LaRosa's Pizzeria. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <ChatBot />
    </div>
  );
};

export default App;