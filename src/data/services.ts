import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'tour-packages',
    icon: 'Compass',
    title: 'Tour Packages',
    shortDesc: 'Customized holiday & pilgrimage packages across popular tourist destinations in South India.',
    fullDesc: 'Carefully curated multi-day tour itineraries for hill stations, heritage temples, beaches, and scenic spots with complete transportation support.',
    features: ['Flexible Itineraries', 'Custom Pickup Points', 'Sightseeing Assistance', 'Dedicated Vehicle & Driver']
  },
  {
    id: 'vehicle-rental',
    icon: 'Car',
    title: 'Vehicle Rental',
    shortDesc: 'Reliable vehicle rental options for local, one-way, and round-trip journeys at competitive rates.',
    fullDesc: 'Rent clean, sanitized, and well-maintained cars, Tempo Travellers, and buses tailored to your group size and schedule.',
    features: ['Clean & Sanitized Vehicles', 'Transparent Pricing', 'Daily / Weekly Options', 'Instant WhatsApp Quotes']
  },
  {
    id: 'group-travel',
    icon: 'Users',
    title: 'Group Travel',
    shortDesc: 'Comfortable transit solutions for family reunions, weddings, institutional trips, and community tours.',
    fullDesc: 'Effortless coordination and spacious seating arrangements so your entire group travels together happily and safely.',
    features: ['Spacious Cabin Layout', 'Ample Luggage Capacity', 'Audio/Public System', 'Experienced Highway Drivers']
  },
  {
    id: 'outstation-travel',
    icon: 'MapPin',
    title: 'Outstation Travel',
    shortDesc: 'Seamless interstate and intercity travel across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.',
    fullDesc: 'Round-the-clock outstation transport with seasoned drivers familiar with highway routes, ghat roads, and toll protocols.',
    features: ['Interstate Permits Handled', 'Ghat Road Expertise', 'Timely Departures', 'On-Route Support']
  },
  {
    id: 'airport-transfers',
    icon: 'Plane',
    title: 'Airport Transfers',
    shortDesc: 'Punctual airport pick-ups and drops ensuring hassle-free travel for you and your guests.',
    fullDesc: 'Timely and stress-free airport transfers with flight tracking and polite chauffeurs to assist with baggage.',
    features: ['Punctual Pickups', 'Flight Delay Monitoring', 'Luggage Assistance', 'Doorstep Service']
  },
  {
    id: 'corporate-events',
    icon: 'Building2',
    title: 'Corporate & Event Transit',
    shortDesc: 'Professional transportation support for conferences, weddings, shoots, and corporate retreats.',
    fullDesc: 'Dependable logistical transit for delegates, wedding guests, and team outings with professional service standards.',
    features: ['Dedicated Fleet Coordinator', 'Scheduled Shuttles', 'Professional Chauffeurs', 'Flexible Billing']
  }
];
