import React from 'react';
import { Shield, Clock, Award, Compass, ArrowRight } from 'lucide-react';
import { COMPANY, createWhatsAppUrl } from '../data/company';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: Shield,
      title: 'Reliable & Clean Vehicles',
      desc: 'Regularly sanitized and well-kept vehicles ready for short and long-distance travel.'
    },
    {
      icon: Clock,
      title: 'Punctual Service',
      desc: 'Committed to scheduled departure and arrival timings for seamless journey planning.'
    },
    {
      icon: Award,
      title: 'Experienced Chauffeurs',
      desc: 'Courteous drivers well-versed with regional highway routes, city transit, and ghat roads.'
    },
    {
      icon: Compass,
      title: 'Customizable Itineraries',
      desc: 'Tailored travel plans that accommodate your group schedule, stops, and preferences.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-brand-navy-950">
      {/* Decorative Gold Ambient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Client Vehicle Photo with Premium Border Styling */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-gold-500/30 shadow-2xl bg-brand-navy-900 group">
              <img
                src="/vehicles/passenger-car.jpg"
                alt="Sri Guru Tours and Travels passenger vehicle"
                className="w-full h-[360px] sm:h-[450px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/90 via-brand-navy-950/20 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-brand-gold-500/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold-500/20 border border-brand-gold-400/40 flex items-center justify-center flex-shrink-0">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sri Guru Tours & Travels</h4>
                    <p className="text-xs text-brand-gold-300">Dedicated to Comfort, Safety & Reliability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold-600/10 to-transparent rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Right Column: Narrative & Factual Features */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span>About Our Service</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-bold text-white uppercase tracking-tight leading-snug">
              YOUR JOURNEY, <br />
              <span className="text-gold-metallic">OUR RESPONSIBILITY</span>
            </h2>

            <p className="mt-5 text-slate-300 text-base leading-relaxed">
              At <strong className="text-white font-semibold">Sri Guru Tours and Travels</strong>, we are committed to delivering comfortable, safe, and dependable travel experiences. Whether you are planning a family holiday, corporate trip, outstation excursion, or pilgrimage tour, our fleet and experienced drivers ensure your journey is smooth and worry-free.
            </p>

            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              We understand that every trip is unique. From prompt airport pickups and city transfers to multi-day hill station tours across South India, we focus on punctuality, clean vehicles, and personalized attention to your travel requirements.
            </p>

            {/* 4 Feature Points */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl glass-card flex items-start gap-3.5 border border-slate-800 hover:border-brand-gold-500/30 transition-colors">
                    <div className="p-2 rounded-lg bg-brand-navy-900 text-brand-gold-400 border border-brand-gold-500/20 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={createWhatsAppUrl("Hi Sri Guru Tours and Travels, I would like to know more about your travel and rental services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
              >
                <span>KNOW MORE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${COMPANY.rawPhone}`}
                className="text-sm font-semibold text-slate-300 hover:text-brand-gold-300 transition-colors"
              >
                Call: {COMPANY.phone}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
