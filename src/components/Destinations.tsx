import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { createWhatsAppUrl } from '../data/company';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export const Destinations: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');

  const states = ['All', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'];

  const filteredDestinations = selectedState === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.state === selectedState);

  return (
    <section id="destinations" className="py-20 sm:py-28 relative bg-brand-navy-900/40 border-t border-b border-brand-gold-500/10">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Popular Travel Circuits</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            TOUR <span className="text-gold-metallic">DESTINATIONS</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore serene hill stations, historic temples, backwaters, and scenic coastlines across South India with Sri Guru Tours and Travels.
          </p>
        </div>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedState === st
                  ? 'bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 text-brand-navy-950 font-bold shadow-gold-sm'
                  : 'bg-brand-navy-950 text-slate-300 hover:text-white hover:bg-brand-navy-900 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative rounded-2xl overflow-hidden bg-brand-navy-950 border border-slate-800 hover:border-brand-gold-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm flex flex-col justify-between"
            >
              {/* Destination Image */}
              <div className="relative h-60 w-full overflow-hidden bg-brand-navy-900">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/20 to-transparent" />
                
                {/* State Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-navy-950/80 backdrop-blur-md border border-brand-gold-500/30 text-brand-gold-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-brand-gold-400" />
                    {destination.state}
                  </span>
                </div>

                {/* Subtitle Badge */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-medium text-brand-gold-400 tracking-wide">
                    {destination.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white uppercase mt-0.5">
                    {destination.name}
                  </h3>
                </div>
              </div>

              {/* Destination Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {destination.highlights.map((point, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-brand-navy-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plan Trip CTA */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href={createWhatsAppUrl(`Hi Sri Guru Tours and Travels, I am planning a trip to ${destination.name} (${destination.state}). Please provide vehicle and tour package details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 transition-all flex items-center justify-center gap-2 shadow-gold-sm"
                  >
                    <span>Plan Your Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Custom Tour Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-navy-950 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold-500/20 border border-brand-gold-400/30 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Have a specific destination or custom route in mind?</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">We customize private itineraries for any location across Tamil Nadu and neighbouring states.</p>
            </div>
          </div>
          <a
            href={createWhatsAppUrl("Hi Sri Guru Tours and Travels, I have a custom tour destination itinerary to discuss.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-brand-navy-950 bg-brand-gold-400 hover:bg-brand-gold-300 uppercase tracking-wider whitespace-nowrap shadow-gold-sm transition-all"
          >
            Custom Tour Enquiry
          </a>
        </div>

      </div>
    </section>
  );
};
