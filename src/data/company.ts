export const COMPANY = {
  name: "Sri Guru Tours and Travels",
  tagline: "TRAVEL WITH COMFORT. JOURNEY WITH CONFIDENCE.",
  subTagline: "Providing comfortable and reliable travel solutions for your journeys, tours, and group transportation across South India.",
  phone: "+91 90035 74884",
  rawPhone: "+919003574884",
  whatsappNumber: "919003574884",
  instagram: "https://www.instagram.com/sriguru_toursandtravels/",
  instagramHandle: "@sriguru_toursandtravels",
  email: "srigurutoursandtravels@gmail.com", // Placeholder editable
  address: "Tamil Nadu, India", // Placeholder editable
  copyrightYear: 2026,
};

export const createWhatsAppUrl = (message: string) => {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const defaultWhatsAppMessage = "Hi Sri Guru Tours and Travels, I would like to enquire about a vehicle booking.";
