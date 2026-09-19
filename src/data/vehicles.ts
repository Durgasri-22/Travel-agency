import { Vehicle } from '../types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'force-traveller',
    name: 'Force Traveller',
    category: 'Tempo Traveller',
    image: '/vehicles/force-traveller.jpg',
    altText: 'Sri Guru Tours and Travels Force Traveller vehicle in scenic location',
    tagline: 'Ideal for Group Tours, Outstation Holidays & Family Trips',
    description: 'Our Force Traveller offers smooth, air-conditioned long-distance travel with spacious push-back seats, ample luggage room, and smooth ride quality for hill stations and outstation journeys.',
    features: [
      'Full AC & Climate Control',
      'Comfortable Push-back Reclining Seats',
      'Dedicated Luggage Storage Space',
      'Smooth Suspension for Hill & Highway Travel',
      'Experienced Professional Driver',
      'Music & Entertainment System Available'
    ],
    capacityNote: 'Details available on enquiry',
    pricingNote: 'Custom quote based on itinerary',
    idealFor: ['Outstation Tours', 'Family Vacations', 'Hill Station Trips', 'Pilgrimage Groups'],
    highlight: true,
  },
  {
    id: 'passenger-car',
    name: 'Passenger Car / SUV',
    category: 'Car / SUV',
    image: '/vehicles/passenger-car.jpg',
    altText: 'Sri Guru Tours and Travels Passenger Car and SUV for family and corporate travel',
    tagline: 'Perfect for Family Journeys, Airport Transfers & City Rentals',
    description: 'Clean, well-maintained passenger car designed for comfortable family trips, corporate commutes, and local or outstation travel with reliable performance.',
    features: [
      'Chilled Air Conditioning',
      'Spacious Seating & Clean Interiors',
      'Ample Boot Space for Bags',
      'Fuel-efficient & Comfortable Highway Ride',
      'Courteous & Verified Chauffeur'
    ],
    capacityNote: 'Details available on enquiry',
    pricingNote: 'Transparent tariff on enquiry',
    idealFor: ['Airport Pick & Drop', 'Small Family Outings', 'Business Travel', 'Local Sightseeing'],
  },
  {
    id: 'sml-bus',
    name: 'SML Mini Bus',
    category: 'Mini Bus',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    altText: 'Sri Guru Tours and Travels SML Mini Bus for corporate and group transit',
    tagline: 'Engineered for Group Transit, College Trips & Events',
    description: 'A dependable mini bus tailored for medium-sized groups, wedding guest transit, corporate outings, and educational tours requiring reliable and comfortable transportation.',
    features: [
      'High-Headroom Spacious Cabin',
      'High-Back Comfortable Seating',
      'Sturdy Chassis for Safe Long Distances',
      'Wide Panoramic Windows',
      'Experienced Heavy Vehicle Driver'
    ],
    capacityNote: 'Details available on enquiry',
    pricingNote: 'Affordable group package rates on enquiry',
    idealFor: ['Wedding Events', 'Corporate Outings', 'College Excursions', 'Temple Tours'],
  },
  {
    id: 'tourist-coach',
    name: 'Luxury Tourist Bus',
    category: 'Luxury Coach',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    altText: 'Sri Guru Tours and Travels Luxury Tourist Bus for large group excursions',
    tagline: 'Premium Comfort for Large Group Excursions & Events',
    description: 'Spacious luxury tourist coach with modern amenities, superior legroom, and high luggage capacity for seamless long-distance travel and community pilgrimage journeys.',
    features: [
      'High-Capacity Luxury Cabin',
      'Reclining Seats with Armrests',
      'Central AC with Individual Vents',
      'Huge Underfloor Luggage Bays',
      'Audio / Mic System for Group Leaders'
    ],
    capacityNote: 'Details available on enquiry',
    pricingNote: 'Custom competitive quote on enquiry',
    idealFor: ['Large Group Tours', 'South India Pilgrimages', 'Institutional Trips', 'Conventions'],
  }
];
