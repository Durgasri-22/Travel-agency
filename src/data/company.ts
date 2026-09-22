export const COMPANY = {
  name: "Sri Guru Tours and Travels",
  tamilName: "ஸ்ரீ குரு டூர்ஸ் & டிராவல்ஸ்",
  proprietor: "GOWRI .H",
  tagline: "TRAVEL WITH COMFORT. JOURNEY WITH CONFIDENCE.",
  subTagline: "Providing comfortable and reliable travel solutions for your journeys, tours, and group transportation across South India.",
  phone: "+91 90035 74884",
  rawPhone: "+919003574884",
  secondaryPhone: "+91 99529 70853",
  rawSecondaryPhone: "+919952970853",
  whatsappNumber: "919003574884",
  email: "srigurutravels111@gmail.com",
  address: "No.93/3B1, Manikandan Flats, Door No. 1/195H, Plot no. B2, Flat No. S1, 2nd Floor, Tamizhan St, Vijayalakshmi Nagar 3rd Main Road, Nanmangalam, Chennai - 600 129.",
  shortAddress: "Nanmangalam, Chennai - 600 129",
  instagram: "https://www.instagram.com/sriguru_toursandtravels/",
  instagramHandle: "@sriguru_toursandtravels",
  youtube: "https://youtube.com/@srigurutoursandtravels111?si=LA8EZMlTXAamWv0h",
  facebook: "https://www.facebook.com/people/Sri-Guru-Tours-And-Travels/61578435493868/?rdid=8mNPtUajumn5kah7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BxWNVaHjb%2F",
  serviceAvailability: "24 Hours Service Everyday (A/C & Non-A/C Available)",
  copyrightYear: 2026,
};

export const createWhatsAppUrl = (message: string) => {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const defaultWhatsAppMessage = "Hi Sri Guru Tours and Travels, I would like to enquire about a vehicle booking.";
