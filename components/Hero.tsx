import React from 'react';
import { ArrowDown, Phone, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';

interface HeroProps {
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow }) => {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-50 animate-slow-zoom"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1950"
          alt="Restaurant Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-larosa-wood via-black/40 to-black/30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        
        <div className="max-w-4xl animate-fade-in-up">
           <div className="flex items-center gap-4 mb-6 text-larosa-gold tracking-widest uppercase font-bold text-sm">
             <div className="h-[2px] w-12 bg-larosa-gold"></div>
             <span>Est. 1985 • West Hempstead, NY</span>
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-none shadow-black drop-shadow-2xl">
            {RESTAURANT_INFO.slogan} <br />
            <span className="text-larosa-tomato italic text-4xl md:text-6xl lg:text-7xl block mt-2">Authentic Italian & Pizza</span>
           </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light leading-relaxed max-w-2xl">
            Serving the West Hempstead community with passion and family tradition for over 20 years. 
            Wood-fired pies, homemade pasta, and a warm welcome await you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={onOrderNow}
              className="px-8 py-4 bg-larosa-tomato text-white text-lg font-bold rounded hover:bg-red-700 transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
            >
              View Menu & Order
            </button>
             <a 
              href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, '')}`}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold rounded hover:bg-white hover:text-larosa-wood transition-all flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              {RESTAURANT_INFO.phone}
            </a>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20 text-white/90">
             <div className="flex items-start">
               <Clock className="w-6 h-6 mr-3 text-larosa-gold flex-shrink-0" />
               <div>
                 <p className="font-bold uppercase text-sm">Open Daily</p>
                 <p className="text-sm text-gray-300">11:00 AM - 10:00 PM</p>
               </div>
             </div>
             <div className="flex items-start">
               <MapPin className="w-6 h-6 mr-3 text-larosa-gold flex-shrink-0" />
               <div>
                 <p className="font-bold uppercase text-sm">Location</p>
                 <p className="text-sm text-gray-300">504 Hempstead Tpke</p>
               </div>
             </div>
             <div className="flex items-start">
                <div className="w-6 h-6 mr-3 flex items-center justify-center text-larosa-gold font-serif font-bold text-lg border border-larosa-gold rounded-full">i</div>
               <div>
                 <p className="font-bold uppercase text-sm">Our Promise</p>
                 <p className="text-sm text-gray-300">Fresh. Family. Flavor.</p>
               </div>
             </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 cursor-pointer" onClick={onOrderNow}>
        <ArrowDown className="w-10 h-10" />
      </div>
    </div>
  );
};