import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || currentIndex < 0 || currentIndex >= items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-lg">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-brand-navy-900/80 text-white hover:text-brand-gold-300 border border-slate-700 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-navy-900/80 text-white hover:text-brand-gold-300 border border-slate-700 hover:border-brand-gold-500/50 transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-navy-900/80 text-white hover:text-brand-gold-300 border border-slate-700 hover:border-brand-gold-500/50 transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden border border-brand-gold-500/30 shadow-2xl bg-brand-navy-950">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
          />
        </div>

        {/* Caption Bar */}
        <div className="mt-4 text-center max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-brand-gold-400" />
            <span>{currentItem.category}</span>
          </div>
          <h3 className="text-lg font-bold text-white uppercase">{currentItem.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentItem.description}</p>
          <span className="text-[11px] text-slate-500 mt-2 block">
            {currentIndex + 1} of {items.length}
          </span>
        </div>
      </div>

    </div>
  );
};
