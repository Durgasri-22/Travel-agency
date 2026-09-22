import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, Clock, CheckCircle2, ShieldCheck, Mail, User } from 'lucide-react';
import { COMPANY, createWhatsAppUrl } from '../data/company';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    pickupLocation: '',
    destination: '',
    passengers: '1-4',
    vehicleRequired: 'Force Traveller',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    let waMsg = `*New Travel Enquiry - Sri Guru Tours and Travels*\n\n`;
    waMsg += `• *Name:* ${formData.name || 'Not provided'}\n`;
    waMsg += `• *Contact Phone:* ${formData.phone || 'Not provided'}\n`;
    waMsg += `• *Travel Date:* ${formData.travelDate || 'Not specified'}\n`;
    waMsg += `• *Pickup Location:* ${formData.pickupLocation || 'Not specified'}\n`;
    waMsg += `• *Destination:* ${formData.destination || 'Not specified'}\n`;
    waMsg += `• *Passengers:* ${formData.passengers}\n`;
    waMsg += `• *Vehicle Preference:* ${formData.vehicleRequired}\n`;
    if (formData.message) {
      waMsg += `• *Additional Notes:* ${formData.message}\n`;
    }

    setFormSubmitted(true);
    setTimeout(() => {
      window.open(createWhatsAppUrl(waMsg), '_blank');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-brand-navy-950">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-900 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            CONTACT & <span className="text-gold-metallic">BOOKINGS</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill out the form below or call us directly. We are ready 24/7 to assist you with quick quotes and custom travel itineraries across South India.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-navy-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                <img
                  src="/logo.png"
                  alt="Sri Guru Tours and Travels Logo"
                  className="w-14 h-14 rounded-full border border-brand-gold-500/40 shadow-gold-sm"
                />
                <div>
                  <h3 className="font-serif text-xl font-bold text-white uppercase">
                    Sri Guru
                  </h3>
                  <p className="text-xs text-brand-gold-300 uppercase tracking-wider font-semibold">
                    {COMPANY.tamilName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                    <User className="w-3 h-3 text-brand-gold-400" />
                    <span>Proprietor: <strong className="text-slate-200">{COMPANY.proprietor}</strong></span>
                  </div>
                </div>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4">
                
                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Direct Booking Phones (24/7)</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-0.5">
                      <a
                        href={`tel:${COMPANY.rawPhone}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-brand-gold-400 transition-colors"
                      >
                        {COMPANY.phone}
                      </a>
                      <span className="hidden sm:inline text-slate-600">/</span>
                      <a
                        href={`tel:${COMPANY.rawSecondaryPhone}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-brand-gold-400 transition-colors"
                      >
                        {COMPANY.secondaryPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Instant WhatsApp Support</span>
                    <a
                      href={createWhatsAppUrl("Hi Sri Guru Tours and Travels, I am contacting you for a travel enquiry.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-brand-gold-300 hover:text-brand-gold-200 transition-colors"
                    >
                      Chat on WhatsApp (+91 90035 74884)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm font-semibold text-slate-200 hover:text-brand-gold-400 transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                {/* Operating Location / Full Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Office Address</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-0.5">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>

                {/* Hours & Availability */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-950 border border-brand-gold-500/30 text-brand-gold-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Service Availability</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {COMPANY.serviceAvailability}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
                <a
                  href={`tel:${COMPANY.rawPhone}`}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-brand-navy-950 hover:bg-brand-navy-800 border border-slate-700 hover:border-brand-gold-400 flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={createWhatsAppUrl("Hi Sri Guru Tours and Travels, I would like to make a travel booking.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 flex items-center justify-center gap-2 shadow-gold-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Factual assurance card */}
            <div className="p-4 rounded-xl bg-brand-navy-900/50 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
              <span>A/C and Non-A/C vehicles available with verified professional chauffeurs across Chennai and South India.</span>
            </div>

          </div>

          {/* Right Column: Interactive Booking & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-brand-navy-900/90 border border-brand-gold-500/30 shadow-2xl">
              
              <div className="mb-6 pb-4 border-b border-slate-800">
                <h3 className="font-serif text-2xl font-bold text-white uppercase">
                  Travel Booking <span className="text-gold-metallic">Enquiry</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Submit your trip details below. Your enquiry will be prepared for immediate WhatsApp confirmation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Pickup Location & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City / Area / Airport"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Destination *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ooty, Kodaikanal, Munnar, Tirupati"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Travel Date, Passengers & Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-gold-400 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Passengers
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    >
                      <option value="1-4">1 - 4 People</option>
                      <option value="5-8">5 - 8 People</option>
                      <option value="9-14">9 - 14 People</option>
                      <option value="15-25">15 - 25 People</option>
                      <option value="25+">25+ People</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Vehicle Required
                    </label>
                    <select
                      value={formData.vehicleRequired}
                      onChange={(e) => setFormData({ ...formData, vehicleRequired: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-gold-400 transition-colors"
                    >
                      <option value="Force Traveller">Force Traveller (AC/Non-AC)</option>
                      <option value="Passenger Car / SUV">Passenger Car / SUV</option>
                      <option value="SML Mini Bus">SML Mini Bus</option>
                      <option value="Luxury Tourist Bus">Luxury Tourist Bus</option>
                      <option value="Any / Recommend Best">Any / Recommend Best</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Additional Trip Notes / Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about return date, sightseeing stops, or specific timings..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl text-sm font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-md hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND ENQUIRY VIA WHATSAPP</span>
                </button>

                {formSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Opening WhatsApp with your itinerary details. If popup was blocked, please click WhatsApp button above.</span>
                  </div>
                )}

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
