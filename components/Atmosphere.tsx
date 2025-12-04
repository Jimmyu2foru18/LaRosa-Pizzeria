import React from 'react';
import { Users, Heart, MapPin } from 'lucide-react';

export const Atmosphere: React.FC = () => {
  return (
    <section className="bg-larosa-wood text-white py-24 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-larosa-gold rounded-full blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-larosa-tomato rounded-full blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              From Our Family <br/>
              To <span className="text-larosa-tomato italic">Yours</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              LaRosa's isn't just a business; it's our home. For over 30 years, we've been serving West Hempstead with recipes passed down from our grandmother. We believe in big portions, loud laughter, and treating every customer like a cousin.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/5 p-6 border border-white/10 hover:border-larosa-gold transition-colors duration-300 group">
                <Users className="w-10 h-10 text-larosa-tomato mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl mb-2">Family First</h3>
                <p className="text-sm text-gray-400">Owned & Operated.</p>
              </div>
              <div className="bg-white/5 p-6 border border-white/10 hover:border-larosa-gold transition-colors duration-300 group">
                <MapPin className="w-10 h-10 text-larosa-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl mb-2">Local Love</h3>
                <p className="text-sm text-gray-400">West Hempstead Proud.</p>
              </div>
              <div className="bg-white/5 p-6 border border-white/10 hover:border-larosa-gold transition-colors duration-300 group">
                <Heart className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl mb-2">Passion</h3>
                <p className="text-sm text-gray-400">Made with Soul.</p>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&q=80&w=600" 
                  alt="Family eating pizza" 
                  className="rounded-lg shadow-2xl transform translate-y-12 hover:scale-105 transition-transform duration-700 border-b-4 border-larosa-tomato"
                />
                 <img 
                  src="https://images.unsplash.com/photo-1593246049226-ded77bf90326?auto=format&fit=crop&q=80&w=600" 
                  alt="Pizza Oven" 
                  className="rounded-lg shadow-2xl transform -translate-y-8 hover:scale-105 transition-transform duration-700 border-t-4 border-larosa-gold"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};