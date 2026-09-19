export interface Vehicle {
  id: string;
  name: string;
  category: 'Tempo Traveller' | 'Car / SUV' | 'Mini Bus' | 'Luxury Coach';
  image: string;
  altText: string;
  tagline: string;
  description: string;
  features: string[];
  capacityNote: string;
  pricingNote: string;
  idealFor: string[];
  highlight?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  tag: string;
  description: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Fleet' | 'Travel' | 'Journeys';
  image: string;
  description: string;
}
