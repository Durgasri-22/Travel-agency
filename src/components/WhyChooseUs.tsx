import React from 'react';
import { Armchair, CalendarCheck2, UserCheck, Route, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Armchair,
      title: 'Comfortable Travel',
      desc: 'Well-cared-for vehicle interiors, functioning air conditioning, and ergonomic seating ensure a pleasant ride across town or across states.'
    },
    {
      icon: CalendarCheck2,
      title: 'Convenient Booking',
      desc: 'Simple, direct booking support via phone call and WhatsApp. Receive prompt quotes and itinerary assistance without tedious procedures.'
    },
    {
      icon: UserCheck,
      title: 'Professional Service',
      desc: 'Courteous chauffeurs with verified driving licenses, experienced in highway driving, navigation, and passenger assistance.'
    },
    {
      icon: Route,
      title: 'Flexible Travel Options',
      desc: 'Customized pickup and drop points, flexible departure times, and adaptable route planning for family vacations, group trips, and events.'
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 relative bg-brand-navy-950">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Our Commitment</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            WHY CHOOSE <span className="text-gold-metallic">SRI GURU</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            We prioritize safety, comfort, and reliability so every journey you take with us is smooth and enjoyable.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-brand-navy-900/80 border border-slate-800 hover:border-brand-gold-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold-sm flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy-950 border border-brand-gold-500/30 group-hover:border-brand-gold-400 text-brand-gold-400 flex items-center justify-center mb-6 transition-colors shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-gold-300 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Subtle bottom decorative line */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-brand-gold-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Quality Assurance</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
