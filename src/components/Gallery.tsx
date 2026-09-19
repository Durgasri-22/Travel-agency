import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { Lightbox } from './Lightbox';
import { Camera, ZoomIn } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { COMPANY } from '../data/company';

export const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 relative bg-brand-navy-900/50 border-t border-b border-brand-gold-500/10">
      
      {/* Background Accent */}
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Glimpse</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            TRAVEL & FLEET <span className="text-gold-metallic">GALLERY</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            A glimpse into our well-kept fleet and memorable journeys across South India.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer bg-brand-navy-950 border border-slate-800 hover:border-brand-gold-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Category Badge Top Left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-brand-navy-950/80 backdrop-blur-md border border-brand-gold-500/30 text-brand-gold-300 text-xs font-medium">
                  {item.category}
                </span>
              </div>

              {/* Zoom Icon Center on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-brand-gold-500 text-brand-navy-950 flex items-center justify-center shadow-gold-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              {/* Caption Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base font-bold text-white group-hover:text-brand-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link Callout */}
        <div className="mt-12 text-center">
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-navy-950 border border-slate-700 hover:border-brand-gold-400 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md group"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
            <span>Follow our journey on Instagram</span>
            <span className="text-brand-gold-400 font-bold">{COMPANY.instagramHandle}</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={GALLERY_ITEMS}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};
