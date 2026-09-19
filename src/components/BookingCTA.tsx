import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { COMPANY, createWhatsAppUrl, defaultWhatsAppMessage } from '../data/company';

export const BookingCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-brand-navy-950 via-brand-navy-900 to-brand-navy-950">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-brand-navy-950/90 border border-brand-gold-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Top Gold Bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-brand-gold-400 to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Planning Your Trip</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            READY FOR YOUR <span className="text-gold-metallic">NEXT JOURNEY?</span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us about your travel requirements and we'll help you plan your journey with comfort, punctuality, and competitive quotes.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            
            <a
              href={`tel:${COMPANY.rawPhone}`}
              className="w-full sm:w-1/2 py-4 px-6 rounded-full font-bold text-slate-100 bg-brand-navy-900 hover:bg-brand-navy-800 border border-brand-gold-500/40 hover:border-brand-gold-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm tracking-wider uppercase group"
            >
              <Phone className="w-4 h-4 text-brand-gold-400 group-hover:scale-110 transition-transform" />
              <span>CALL NOW</span>
            </a>

            <a
              href={createWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-4 px-6 rounded-full font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-md hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wider uppercase transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>

          </div>

          <div className="mt-6 text-xs text-slate-400">
            Direct Helpline: <span className="text-slate-200 font-semibold">{COMPANY.phone}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
