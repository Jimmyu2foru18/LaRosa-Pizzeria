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
import { MapPin, Phone, Clock, Facebook, Instagram, Twitter, Lock, Mail, ExternalLink, ChefHat, Navigation as NavIcon, X, ZoomIn } from 'lucide-react';
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
                   
                   <div className="bg-larosa-cream p-6 rounded-xl border border-larosa-gold/20 max-w-2xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-larosa-wood">Need help planning?</h3>
                        <p className="text-gray-600 text-sm">Call us to discuss your event details.</p>
                      </div>
                      <a href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, '')}`} className="px-6 py-3 bg-larosa-wood text-white font-bold rounded hover:bg-gray-800 transition-colors flex items-center">
                        <Phone className="w-5 h-5 mr-2" /> Call {RESTAURANT_INFO.phone}
                      </a>
                   </div>
                 </div>

                 {/* Render the actual Catering Menu */}
                 <MenuDisplay onAddToCart={addToCart} defaultSection="Catering" />
              </div>
           </div>
        );
      case 'coupons':
        return (
           <div className="bg-larosa-cream min-h-screen pt-24 pb-12 px-4">
             <div className="max-w-5xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-serif font-bold text-larosa-wood mb-4">Current Specials & Coupons</h2>
                  <p className="text-gray-600">Mention these coupons when ordering.</p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 border-4 border-dashed border-larosa-tomato rounded-xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <div className="absolute top-0 right-0 bg-larosa-tomato text-white px-4 py-1 text-sm font-bold rotate-45 transform translate-x-8 translate-y-4 shadow-md w-32 text-center">LIMITED</div>
                     <h3 className="text-3xl font-serif font-bold text-larosa-wood mb-2">Monday Madness</h3>
                     <p className="text-xl font-bold text-larosa-tomato mb-4">$18.00 + Tax</p>
                     <p className="text-gray-700 mb-4 border-t border-b border-gray-100 py-4">
                       Large Cheese Pizza<br/>
                       <span className="text-sm text-gray-500">(Pick-up Only. Cash Only.)</span>
                     </p>
                     <p className="text-xs text-gray-400 uppercase tracking-wide">Valid Mondays only. Cannot be combined with other offers.</p>
                  </div>
                  
                  <div className="bg-white p-8 border-4 border-dashed border-larosa-wood rounded-xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <h3 className="text-3xl font-serif font-bold text-larosa-wood mb-2">Family Feast</h3>
                     <p className="text-xl font-bold text-larosa-tomato mb-4">$34.99 + Tax</p>
                     <p className="text-gray-700 mb-4 border-t border-b border-gray-100 py-4">
                       • 1 Large Cheese Pizza<br/>
                       • 1 Order of Buffalo Wings (10)<br/>
                       • 2 Liter Soda
                     </p>
                     <p className="text-xs text-gray-400 uppercase tracking-wide">Valid anytime. Toppings extra.</p>
                  </div>

                   <div className="bg-white p-8 border-4 border-dashed border-larosa-gold rounded-xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <h3 className="text-3xl font-serif font-bold text-larosa-wood mb-2">Lunch Special</h3>
                     <p className="text-xl font-bold text-larosa-tomato mb-4">$9.95 + Tax</p>
                     <p className="text-gray-700 mb-4 border-t border-b border-gray-100 py-4">
                       2 Slices of Cheese Pizza<br/>
                       & Fountain Drink
                     </p>
                     <p className="text-xs text-gray-400 uppercase tracking-wide">Valid Mon-Fri 11am-3pm.</p>
                  </div>

                  <div className="bg-white p-8 border-4 border-dashed border-gray-300 rounded-xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center">
                     <p className="text-lg text-gray-500 mb-2">More offers coming soon!</p>
                     <p className="text-sm text-gray-400">Join our mailing list to stay updated.</p>
                  </div>
               </div>
             </div>
           </div>
        );
      case 'gallery':
         const images = [
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=1200"
         ];

         return (
             <div className="bg-white min-h-screen pt-24 pb-12 px-4">
                 <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                       <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">Visual Feast</span>
                       <h2 className="text-4xl font-serif font-bold text-larosa-wood mt-2">Photo Gallery</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                       {images.map((src, i) => (
                          <div 
                            key={i} 
                            onClick={() => setSelectedImage(src)}
                            className={`overflow-hidden rounded-lg shadow-md group relative cursor-pointer ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                          >
                             <img 
                               src={src} 
                               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                               alt="Gallery"
                             />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ZoomIn className="text-white w-8 h-8" />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Lightbox Modal */}
                 {selectedImage && (
                    <div 
                      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
                      onClick={() => setSelectedImage(null)}
                    >
                       <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2">
                         <X className="w-8 h-8" />
                       </button>
                       <img 
                         src={selectedImage} 
                         className="max-h-[90vh] max-w-full rounded shadow-2xl"
                         onClick={(e) => e.stopPropagation()} // Prevent close on image click
                         alt="Full size" 
                       />
                    </div>
                 )}
             </div>
         );
      case 'careers':
         return <Careers />;
      case 'contact':
        return (
           <div className="max-w-7xl mx-auto px-4 py-32 animate-fade-in-up">
              <h2 className="text-5xl font-serif font-bold text-larosa-wood mb-12 text-center">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-10 shadow-xl border-l-4 border-larosa-tomato relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-larosa-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                   <h3 className="text-3xl font-serif font-bold mb-8 text-larosa-wood">Get in Touch</h3>
                   <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                        <div>
                          <p className="font-bold text-gray-900">Visit Us</p>
                          <span className="text-gray-600 font-light">{RESTAURANT_INFO.address}</span>
                          <a 
                             href={`https://www.google.com/maps/dir/?api=1&destination=LaRosa's+Pizzeria+West+Hempstead+NY`}
                             target="_blank"
                             rel="noreferrer"
                             className="block text-sm text-larosa-tomato underline mt-1 font-bold hover:text-red-700"
                          >
                             Get Directions
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                        <div>
                          <p className="font-bold text-gray-900">Call Us</p>
                          <a href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, '')}`} className="text-gray-600 font-light hover:text-larosa-tomato underline transition-colors">
                            {RESTAURANT_INFO.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start">
                         <Mail className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                         <div>
                           <p className="font-bold text-gray-900">Email Us</p>
                           <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-gray-600 font-light hover:text-larosa-tomato underline transition-colors">
                             {RESTAURANT_INFO.email}
                           </a>
                         </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-6 h-6 text-larosa-tomato mr-4 mt-1" />
                         <div>
                          <p className="font-bold text-gray-900">Opening Hours</p>
                          <p className="text-gray-600 font-light text-sm">Mon - Thu: 11:00am - 10:00pm</p>
                          <p className="text-gray-600 font-light text-sm">Fri - Sat: 11:00am - 11:00pm</p>
                          <p className="text-gray-600 font-light text-sm">Sunday: 12:00pm - 10:00pm</p>
                        </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500 italic">"Save time by ordering online! Avoid the hold music."</p>
                      <button onClick={() => setCurrentPage('menu')} className="mt-2 text-larosa-wood font-bold underline hover:text-larosa-tomato">Start Online Order &rarr;</button>
                   </div>
                </div>
                <div className="bg-gray-200 h-96 md:h-auto relative group overflow-hidden rounded-xl shadow-lg">
                   {/* Google Maps Embed for West Hempstead */}
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.167824765406!2d-73.6558!3d40.7048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27b79d2b271ad%3A0x67776b368739988!2s504%20Hempstead%20Turnpike%2C%20West%20Hempstead%2C%20NY%2011552!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                      className="grayscale group-hover:grayscale-0 transition-all duration-700 min-h-[400px]"
                    ></iframe>
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
            <MenuDisplay onAddToCart={addToCart} />
            <Testimonials />
            
            {/* Featured Section */}
            <div className="bg-larosa-wood text-white py-24 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
              <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-serif font-bold mb-6">Join the LaRosa Family</h2>
                <p className="mb-10 text-gray-300 font-light max-w-2xl mx-auto">Sign up for our newsletter to receive exclusive offers, secret menu items, and updates on our seasonal specialties.</p>
                <div className="flex justify-center max-w-md mx-auto gap-0">
                  <input type="email" placeholder="Your email address" className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-colors" />
                  <button className="bg-larosa-tomato px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors border-l border-white/10">Subscribe</button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-larosa-cream font-sans">
      <Navigation 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-larosa-wood text-gray-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
              <div className="mb-6 bg-white p-2 inline-block rounded-lg">
                <img src="https://www.larosaspizzeria.com/wordpress/wp-content/themes/html5blank-stable/img/logo-larosas-pizzeria-west-hempstead.png" alt={RESTAURANT_INFO.name} className="h-16 w-auto" />
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-6">West Hempstead's favorite slice since 1985. Family owned, community focused.</p>
              <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-larosa-gold cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-larosa-gold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-larosa-gold cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-larosa-gold transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentPage('menu')} className="hover:text-larosa-gold transition-colors">Takeout Menu</button></li>
              <li><button onClick={() => setCurrentPage('catering')} className="hover:text-larosa-gold transition-colors">Catering</button></li>
              <li><button onClick={() => setCurrentPage('coupons')} className="hover:text-larosa-gold transition-colors">Coupons</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-larosa-gold transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Mon - Thu</span> <span className="text-white">11am - 10pm</span></li>
                <li className="flex justify-between"><span>Fri - Sat</span> <span className="text-white">11am - 11pm</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-white">12pm - 10pm</span></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <button onClick={() => setCurrentPage('careers')} className="text-larosa-gold hover:text-white transition-colors text-sm flex items-center">
                  <ChefHat className="w-4 h-4 mr-2" /> Employment Opportunities
                </button>
              </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} LaRosa's Restaurant & Pizzeria. All rights reserved.</p>
          <button 
            onClick={() => setCurrentPage('employee')} 
            className="mt-4 md:mt-0 flex items-center text-gray-600 hover:text-gray-400 transition-colors"
          >
            <Lock className="w-3 h-3 mr-1" /> Staff Login
          </button>
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