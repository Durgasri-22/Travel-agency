import React from 'react';
import { SERVICES } from '../data/services';
import { createWhatsAppUrl } from '../data/company';
import { Compass, Car, Users, MapPin, Plane, Building2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Car,
  Users,
  MapPin,
  Plane,
  Building2,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28 relative bg-brand-navy-900/60 border-t border-b border-brand-gold-500/10">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Our Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            COMPREHENSIVE <span className="text-gold-metallic">TRAVEL SERVICES</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            From customized holiday tours and group transport to reliable outstation vehicle rentals, we cater to all your travel requirements.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Compass;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl p-6 sm:p-8 bg-brand-navy-950/80 border border-slate-800 hover:border-brand-gold-500/50 shadow-lg hover:shadow-gold-sm transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Bar with Icon & Action Link */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 p-3.5 rounded-xl bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 group-hover:border-brand-gold-400 group-hover:bg-brand-gold-500/10 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <a
                      href={createWhatsAppUrl(`Hi Sri Guru Tours and Travels, I want to enquire about ${service.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-400 hover:text-brand-gold-300 hover:bg-brand-navy-900 transition-colors"
                      aria-label={`Enquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4">
                  <a
                    href={createWhatsAppUrl(`Hi Sri Guru Tours and Travels, please provide details for: ${service.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-brand-navy-950 bg-brand-navy-900 group-hover:bg-gradient-to-r group-hover:from-brand-gold-400 group-hover:to-brand-gold-500 border border-slate-700/80 group-hover:border-transparent flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
