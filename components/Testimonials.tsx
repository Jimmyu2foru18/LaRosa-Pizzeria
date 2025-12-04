import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Mike D.",
      role: "Local Guide",
      text: "I've been coming here since I was a kid. The Baked Clams are untouched by time—perfect every single time. Best slice in West Hempstead, hands down.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Customer",
      text: "We catered our office holiday party with the Penne Alla Vodka and Chicken Parm trays. Not a scrap was left. The delivery was right on time and piping hot.",
      rating: 5
    },
    {
      id: 3,
      name: "Anthony R.",
      role: "Foodie",
      text: "The Grandma Pie is the real deal. Thin, crispy, garlicy—just like Nonna used to make. Don't sleep on the rice balls either!",
      rating: 5
    }
  ];

  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">What Neighbors Say</span>
          <h2 className="text-4xl font-serif font-bold text-larosa-wood mt-2">Local Love</h2>
          <div className="w-24 h-1 bg-larosa-gold mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-8 rounded-xl relative hover:shadow-lg transition-shadow duration-300">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-larosa-gold/20" />
              <div className="flex text-larosa-gold mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-bold text-gray-900 font-serif">{review.name}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};