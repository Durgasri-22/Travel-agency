import React, { useState } from 'react';
import { VEHICLES } from '../data/vehicles';
import { Vehicle } from '../types';
import { VehicleModal } from './VehicleModal';
import { createWhatsAppUrl } from '../data/company';
import { Eye, MessageSquare, Check, Sparkles, ShieldCheck } from 'lucide-react';

export const Fleet: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Tempo Traveller', 'Car / SUV', 'Mini Bus', 'Luxury Coach'];

  const filteredVehicles = activeFilter === 'All'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeFilter);

  return (
    <section id="fleet" className="py-20 sm:py-28 relative bg-brand-navy-950">
      
      {/* Subtle Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Well-Maintained Fleet</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            OUR <span className="text-gold-metallic">FLEET</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose the right vehicle for your journey. From comfortable passenger cars to spacious Tempo Travellers and group coaches.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 text-brand-navy-950 font-bold shadow-gold-sm'
                  : 'bg-brand-navy-900/90 text-slate-300 hover:text-white hover:bg-brand-navy-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group relative rounded-2xl sm:rounded-3xl bg-brand-navy-900/90 border border-slate-800 hover:border-brand-gold-500/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm"
            >
              
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-brand-navy-950">
                <img
                  src={vehicle.image}
                  alt={vehicle.altText}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-black/30" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-navy-950/80 backdrop-blur-md border border-brand-gold-500/40 text-brand-gold-300 text-xs font-semibold uppercase tracking-wider">
                    {vehicle.category}
                  </span>
                </div>

                {/* Real Vehicle Badge if from client */}
                {vehicle.id === 'force-traveller' || vehicle.id === 'passenger-car' ? (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Actual Vehicle Photo
                    </span>
                  </div>
                ) : null}

                {/* Capacity Note Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 bg-brand-navy-950/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-400" />
                    Clean & Sanitized
                  </span>
                  <span className="bg-brand-navy-950/80 px-2.5 py-1 rounded-md border border-slate-700/60 text-brand-gold-300">
                    {vehicle.capacityNote}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-gold-300 transition-colors uppercase">
                    {vehicle.name}
                  </h3>
                  
                  <p className="mt-1 text-xs font-medium text-brand-gold-400">
                    {vehicle.tagline}
                  </p>
                  
                  <p className="mt-3 text-slate-300 text-sm leading-relaxed line-clamp-2">
                    {vehicle.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicle.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 pt-5 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-brand-navy-950 hover:bg-brand-navy-800 border border-slate-700 hover:border-brand-gold-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-brand-gold-400" />
                    <span>View Details</span>
                  </button>

                  <a
                    href={createWhatsAppUrl(`Hi Sri Guru Tours and Travels, I want to enquire about booking the ${vehicle.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquire Now</span>
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Fleet Bottom Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-400">
            Need a specific vehicle configuration or customized multi-vehicle group tour?{' '}
            <a
              href={createWhatsAppUrl("Hi Sri Guru Tours and Travels, I need custom vehicle requirements for an upcoming trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold-400 hover:text-brand-gold-300 font-semibold underline underline-offset-4 ml-1"
            >
              Contact our travel team on WhatsApp
            </a>
          </p>
        </div>

      </div>

      {/* Vehicle Modal */}
      <VehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </section>
  );
};
