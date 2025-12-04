import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../constants';
import { Briefcase, Send, CheckCircle } from 'lucide-react';
import { JobApplication } from '../types';

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState<JobApplication>({
    fullName: '',
    phone: '',
    email: '',
    position: 'Server',
    experience: '',
    availability: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-larosa-cream pt-32 px-4 flex justify-center items-start">
         <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-lg border-t-8 border-larosa-tomato">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Application Received</h2>
            <p className="text-gray-600 mb-8">
               Thank you for your interest in joining the LaRosa's family. We have received your application and will contact you if your qualifications match our current needs.
            </p>
            <button 
               onClick={() => setIsSubmitted(false)}
               className="text-larosa-wood font-bold underline hover:text-larosa-tomato"
            >
               Submit another application
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-larosa-cream pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
           <span className="text-larosa-tomato font-bold uppercase tracking-widest text-sm">Join the Team</span>
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-larosa-wood mt-2 mb-6">Employment Opportunities</h2>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
             We are an equal opportunity employer, if you would like to join the best pizzeria and restaurant in West Hempstead, we want to hear from you.
           </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
           <div className="md:w-1/3 bg-larosa-wood p-8 text-white flex flex-col justify-between">
              <div>
                 <Briefcase className="w-12 h-12 text-larosa-gold mb-6" />
                 <h3 className="text-2xl font-serif font-bold mb-4">Why Work With Us?</h3>
                 <ul className="space-y-4 text-gray-300">
                    <li className="flex items-center"><div className="w-2 h-2 bg-larosa-gold rounded-full mr-3"></div>Family Atmosphere</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-larosa-gold rounded-full mr-3"></div>Flexible Schedules</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-larosa-gold rounded-full mr-3"></div>Meal Discounts</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-larosa-gold rounded-full mr-3"></div>Growth Opportunities</li>
                 </ul>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                 <p className="text-sm text-gray-400">Questions?</p>
                 <p className="font-bold">{RESTAURANT_INFO.phone}</p>
              </div>
           </div>

           <div className="md:w-2/3 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                       <input 
                         required
                         type="text" 
                         name="fullName"
                         value={formData.fullName}
                         onChange={handleChange}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato" 
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                       <input 
                         required
                         type="tel" 
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato" 
                       />
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                       <input 
                         required
                         type="email" 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato" 
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Position of Interest</label>
                       <select 
                         name="position"
                         value={formData.position}
                         onChange={handleChange}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato bg-white"
                       >
                          <option>Server</option>
                          <option>Chef / Cook</option>
                          <option>Driver</option>
                          <option>Counter Person</option>
                          <option>Manager</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <textarea 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your previous restaurant experience..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato"
                    ></textarea>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <input 
                      type="text" 
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="e.g. Weekends, Evenings, Full-time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-larosa-tomato" 
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-larosa-tomato text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center uppercase tracking-widest"
                 >
                   Submit Application <Send className="w-5 h-5 ml-2" />
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};