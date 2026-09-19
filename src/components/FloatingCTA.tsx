import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { COMPANY, createWhatsAppUrl, defaultWhatsAppMessage } from '../data/company';

export const FloatingCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-brand-navy-950/95 border-t border-brand-gold-500/30 p-2.5 backdrop-blur-md shadow-2xl flex items-center gap-2">
      
      {/* Call Button */}
      <a
        href={`tel:${COMPANY.rawPhone}`}
        className="flex-1 py-3 px-3 rounded-xl bg-brand-navy-900 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 active:bg-brand-navy-800"
      >
        <Phone className="w-4 h-4 text-brand-gold-400" />
        <span>CALL NOW</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={createWhatsAppUrl(defaultWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 text-brand-navy-950 font-bold text-xs flex items-center justify-center gap-2 shadow-gold-sm active:scale-95 transition-transform"
      >
        <MessageSquare className="w-4 h-4" />
        <span>WHATSAPP</span>
      </a>

    </div>
  );
};
