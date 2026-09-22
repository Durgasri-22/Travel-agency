import React from 'react';
import { Phone, MessageSquare, ChevronRight, MapPin } from 'lucide-react';
import { InstagramIcon, YouTubeIcon, FacebookIcon } from './Icons';
import { COMPANY, createWhatsAppUrl, defaultWhatsAppMessage } from '../data/company';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Fleet', href: '#fleet' },
    { name: 'Tour Destinations', href: '#destinations' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Contact & Booking', href: '#contact' },
  ];

  const fleetLinks = [
    { name: 'Force Traveller (AC/Non-AC)', href: '#fleet' },
    { name: 'Passenger Car / SUV', href: '#fleet' },
    { name: 'SML Mini Bus', href: '#fleet' },
    { name: 'Luxury Tourist Coach', href: '#fleet' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-navy-950 border-t border-brand-gold-500/20 text-slate-300 pt-16 pb-24 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Address */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-gold-500 to-brand-gold-200 shadow-gold-sm flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Sri Guru Tours and Travels"
                  className="w-full h-full object-cover rounded-full bg-brand-navy-950"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gold-metallic uppercase tracking-wider">
                  Sri Guru Tours & Travels
                </h3>
                <p className="text-xs text-brand-gold-300 font-medium">
                  {COMPANY.tamilName} • {COMPANY.proprietor}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing dependable, safe, and comfortable travel solutions with A/C & Non A/C vehicles for outstation journeys, tours, and group transit across South India.
            </p>

            {/* Address */}
            <div className="pt-1 flex items-start gap-2.5 text-xs text-slate-400 max-w-sm">
              <MapPin className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
              <span>{COMPANY.address}</span>
            </div>

            {/* Social Links (Instagram, YouTube, Facebook, WhatsApp, Phone) */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-red-400 transition-colors"
                aria-label="Sri Guru Tours YouTube Channel"
                title="YouTube Channel"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>

              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Sri Guru Tours Facebook Page"
                title="Facebook Page"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-pink-400 transition-colors"
                aria-label="Sri Guru Tours Instagram"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              
              <a
                href={createWhatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp Sri Guru Tours"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={`tel:${COMPANY.rawPhone}`}
                className="p-2.5 rounded-full bg-brand-navy-900 border border-slate-700 hover:border-brand-gold-400 text-slate-300 hover:text-brand-gold-400 transition-colors"
                aria-label="Call Sri Guru Tours"
                title="Call"
              >
                <Phone className="w-4 h-4 text-brand-gold-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-slate-400 hover:text-brand-gold-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-gold-400 transition-colors" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold-400 mb-4">
              Our Fleet
            </h4>
            <ul className="space-y-2 text-sm">
              {fleetLinks.map((fleet) => (
                <li key={fleet.name}>
                  <a
                    href={fleet.href}
                    onClick={(e) => handleSmoothScroll(e, fleet.href)}
                    className="text-slate-400 hover:text-brand-gold-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-gold-400 transition-colors" />
                    <span>{fleet.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold-400 mb-4">
              Booking Helpline
            </h4>
            <div className="space-y-2.5 text-sm">
              <div>
                <p className="text-[11px] text-slate-400">24/7 Phone Booking:</p>
                <div className="space-y-0.5 mt-0.5">
                  <a
                    href={`tel:${COMPANY.rawPhone}`}
                    className="font-bold text-white hover:text-brand-gold-300 text-sm block"
                  >
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY.rawSecondaryPhone}`}
                    className="font-bold text-white hover:text-brand-gold-300 text-sm block"
                  >
                    {COMPANY.secondaryPhone}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-slate-400">Email Support:</p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-xs text-brand-gold-300 hover:text-brand-gold-200 block truncate"
                >
                  {COMPANY.email}
                </a>
              </div>

              <div>
                <p className="text-[11px] text-slate-400">Social Channels:</p>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <a href={COMPANY.youtube} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                    YouTube
                  </a>
                  <span className="text-slate-600">•</span>
                  <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Facebook
                  </a>
                  <span className="text-slate-600">•</span>
                  <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {COMPANY.copyrightYear} Sri Guru Tours and Travels. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>24 Hours Service Everyday • A/C & Non-A/C Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
