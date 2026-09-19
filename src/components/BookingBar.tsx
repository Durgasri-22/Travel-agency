import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { createWhatsAppUrl } from '../data/company';

export const BookingBar: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1-4');

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    
    let message = `Hi Sri Guru Tours and Travels, I would like to get a quote for a travel journey.`;
    if (pickup) message += `\n• Pickup Location: ${pickup}`;
    if (destination) message += `\n• Destination: ${destination}`;
    if (date) message += `\n• Travel Date: ${date}`;
    if (passengers) message += `\n• Passengers: ${passengers}`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="quick-booking" className="relative z-20 -mt-8 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-brand-gold-500/20 bg-brand-navy-900/90">
        
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold-400" />
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-brand-gold-300 uppercase">
              Quick Travel Estimate & Enquiry
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Direct response on WhatsApp
          </span>
        </div>

        <form onSubmit={handleGetQuote} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
          
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Pickup Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Chennai, Airport, Home"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors"
            />
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Destination</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ooty, Munnar, Tirupati"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors"
            />
          </div>

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Passengers */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Passengers</span>
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors"
            >
              <option value="1-4">1 - 4 Passengers (Car / SUV)</option>
              <option value="5-8">5 - 8 Passengers (Spacious SUV)</option>
              <option value="9-14">9 - 14 Passengers (Tempo Traveller)</option>
              <option value="15-25">15 - 25 Passengers (Mini Bus)</option>
              <option value="25+">25+ Passengers (Tourist Coach)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>GET A QUOTE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};
