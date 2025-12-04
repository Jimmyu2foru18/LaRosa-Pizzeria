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
import { MapPin, Phone, Clock, Facebook, Instagram, Twitter, Lock, Mail, X, ZoomIn } from 'lucide-react';
import { RESTAURANT_INFO } from './constants';

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
        return (
          <div className="bg-larosa-cream min-h-screen pt-32 pb-12">
             <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-larosa-wood mb-8">Special Offers</h2>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-larosa-tomato relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-larosa-tomato text-white text-xs font-bold px-3 py-1">LIMITED TIME</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Monday Madness</h3>
                      <p className="text-gray-600 mb-4">Large Cheese Pie for only $18.95</p>
                      <button className="text-sm font-bold text-larosa-tomato border border-larosa-tomato px-4 py-2 rounded hover:bg-larosa-tomato hover:text-white transition-colors">Mention when ordering</button>
                   </div>
                   <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-larosa-wood relative overflow-hidden group">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Family Feast</h3>
                      <p className="text-gray-600 mb-4">2 Large Pies, Baked Ziti, Garlic Knots & 2 Liter Soda - $54.95</p>
                      <button className="text-sm font-bold text-larosa-wood border border-larosa-wood px-4 py-2 rounded hover:bg-larosa-wood hover:text-white transition-colors">Mention when ordering</button>
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
                      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
                      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80",
                      "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80",
                      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80",
                      "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=800&q=80",
                      "https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=800&q=80"
                    ].map((src, idx) => (
                       <div key={idx} className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-md" onClick={() => setSelectedImage(src)}>
                          <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery" />
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
                  <div className="bg-gray-200 h-96 md:h-auto relative">
                     <img 
                       src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
                       alt="Map placeholder" 
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-lg shadow-lg text-center">
                           <p className="font-bold text-larosa-wood">LaRosa's Pizzeria</p>
                           <p className="text-xs text-gray-500">West Hempstead</p>
                        </div>
                     </div>
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
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
