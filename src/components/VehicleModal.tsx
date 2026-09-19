import React from 'react';
import { X, Check, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../types';
import { COMPANY, createWhatsAppUrl } from '../data/company';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-brand-navy-950 border border-brand-gold-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-navy-900/80 text-slate-300 hover:text-white hover:bg-brand-navy-800 border border-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vehicle Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-brand-navy-900">
          <img
            src={vehicle.image}
            alt={vehicle.altText}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-300 border border-brand-gold-500/40 text-xs font-semibold uppercase tracking-wider mb-2">
              {vehicle.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase">
              {vehicle.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h4 className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-1">
              Vehicle Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-3">
              Included Amenities & Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {vehicle.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-brand-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-gold-400" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For */}
          <div>
            <h4 className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-2">
              Recommended For
            </h4>
            <div className="flex flex-wrap gap-2">
              {vehicle.idealFor.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-brand-navy-900 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Notice Bar */}
          <div className="p-3.5 rounded-xl bg-brand-navy-900/90 border border-brand-gold-500/20 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
            <div>
              <strong className="text-slate-200">Seating Capacity & Tariff:</strong> {vehicle.capacityNote}. Reach out via WhatsApp or Call for a tailored itinerary quote.
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={createWhatsAppUrl(`Hi Sri Guru Tours and Travels, I am interested in booking the ${vehicle.name}. Please share seating capacity, availability, and pricing.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 rounded-xl font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 text-sm shadow-gold-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire for {vehicle.name}</span>
            </a>

            <a
              href={`tel:${COMPANY.rawPhone}`}
              className="py-3 px-6 rounded-xl font-semibold text-slate-200 hover:text-white bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-gold-400" />
              <span>Call Us</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
