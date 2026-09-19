import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onFleetClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onFleetClick }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Scrim and Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/vehicles/force-traveller.jpg"
          alt="Sri Guru Tours and Travels Force Traveller"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-90 animate-pulse-slow"
        />
        {/* Layered Gradient Overlays for Maximum Contrast and Luxury Mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-950/95 via-brand-navy-950/80 to-brand-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/40 to-brand-navy-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,10,19,0.7)_100%)]" />
      </div>

      {/* Subtle Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Small Premium Gold Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy-900/90 border border-brand-gold-500/30 text-brand-gold-300 shadow-gold-sm backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
          <span className="text-xs font-semibold tracking-widest uppercase">
            Sri Guru Tours and Travels
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight sm:leading-none uppercase max-w-4xl"
        >
          TRAVEL WITH <span className="text-gold-metallic">COMFORT.</span>
          <br />
          JOURNEY WITH <span className="text-gold-gradient">CONFIDENCE.</span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Sri Guru Tours and Travels provides comfortable and reliable travel solutions for your journeys, tours and group transportation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm sm:text-base font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-md hover:shadow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Book Your Journey</span>
          </button>

          <button
            onClick={onFleetClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-slate-100 bg-brand-navy-900/80 hover:bg-brand-navy-800 border border-brand-gold-500/30 hover:border-brand-gold-400 transition-all duration-300 backdrop-blur-md uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Explore Our Fleet</span>
          </button>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate-800/80 max-w-3xl w-full text-slate-300 text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
            <span>Well-Maintained Fleet</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-center sm:text-left">
            <PhoneCall className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
            <span>Instant Booking Support</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span>Available for Custom Trips</span>
          </div>
        </motion.div>

      </div>

      {/* Down Arrow Indicator */}
      <a
        href="#quick-booking"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 hover:text-brand-gold-400 transition-colors p-2 animate-bounce"
        aria-label="Scroll down to quick booking"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
