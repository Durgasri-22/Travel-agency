import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingBar } from './components/BookingBar';
import { About } from './components/About';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { Destinations } from './components/Destinations';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { BookingCTA } from './components/BookingCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';

export const App: React.FC = () => {
  const scrollToBooking = () => {
    const el = document.querySelector('#quick-booking') || document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFleet = () => {
    const el = document.querySelector('#fleet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex flex-col selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      {/* Navigation */}
      <Navbar onBookNowClick={scrollToBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onBookClick={scrollToBooking} onFleetClick={scrollToFleet} />

        {/* 2. Quick Booking Bar */}
        <BookingBar />

        {/* 3. About Section */}
        <About />

        {/* 4. Services Section */}
        <Services />

        {/* 5. Our Fleet Section */}
        <Fleet />

        {/* 6. Tour Destinations Section */}
        <Destinations />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Travel & Fleet Gallery */}
        <Gallery />

        {/* 9. Booking CTA Banner */}
        <BookingCTA />

        {/* 10. Contact & Booking Form */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating Mobile Sticky Action Bar */}
      <FloatingCTA />
    </div>
  );
};

export default App;
