import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ChevronRight } from 'lucide-react';
import { COMPANY, createWhatsAppUrl, defaultWhatsAppMessage } from '../data/company';

interface NavbarProps {
  onBookNowClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Tours', href: '#destinations' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleBookNow = () => {
    setMobileMenuOpen(false);
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      const element = document.querySelector('#quick-booking') || document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-navy-950/90 backdrop-blur-md border-b border-brand-gold-500/20 shadow-lg shadow-black/40 py-3'
            : 'bg-gradient-to-b from-brand-navy-950/90 via-brand-navy-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-gold-600 via-brand-gold-400 to-brand-gold-200 shadow-gold-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Sri Guru Tours and Travels Logo"
                  className="w-full h-full object-cover rounded-full bg-brand-navy-950"
                  onError={(e) => {
                    // fallback if logo fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-metallic group-hover:text-brand-gold-300 transition-colors uppercase">
                  Sri Guru
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-slate-300 uppercase font-medium">
                  Tours & Travels
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-brand-gold-400 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-gold-400 transition-all duration-300 group-hover:w-3/4 rounded-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${COMPANY.rawPhone}`}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-brand-gold-300 transition-colors border border-slate-700/60 rounded-full hover:border-brand-gold-500/40 bg-brand-navy-900/60"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>{COMPANY.phone}</span>
              </a>

              <button
                onClick={handleBookNow}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href={`tel:${COMPANY.rawPhone}`}
                className="p-2 text-brand-gold-400 bg-brand-navy-900 border border-brand-gold-500/30 rounded-full"
                aria-label="Call Sri Guru Tours"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-brand-gold-400 hover:bg-brand-navy-900 border border-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-brand-navy-950 border-l border-brand-gold-500/20 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Sri Guru Logo"
                  className="w-10 h-10 rounded-full border border-brand-gold-400"
                />
                <span className="font-serif font-bold text-gold-metallic">SRI GURU</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-6 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-200 hover:text-brand-gold-300 hover:bg-brand-navy-900/60 rounded-xl transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Actions in Drawer */}
          <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
            <a
              href={`tel:${COMPANY.rawPhone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-navy-900 border border-brand-gold-500/30 text-slate-200 text-sm font-semibold hover:border-brand-gold-400"
            >
              <Phone className="w-4 h-4 text-brand-gold-400" />
              <span>Call: {COMPANY.phone}</span>
            </a>

            <a
              href={createWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-brand-navy-950 text-sm font-bold shadow-gold-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
