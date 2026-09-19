import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tag: 'Queen of Hill Stations',
    description: 'Picturesque Nilgiri mountains, botanical gardens, pine forests, and soothing tea estates.',
    highlights: ['Botanical Garden', 'Doddabetta Peak', 'Pykara Lake', 'Tea Museum']
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=800&q=80',
    tag: 'Princess of Hill Stations',
    description: 'Misty cliffs, serene lake boating, Pillar Rocks, and pine forest nature trails.',
    highlights: ['Kodai Lake', 'Coakers Walk', 'Pillar Rocks', 'Silver Cascade Falls']
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    tag: 'Tea Plantations & Misty Valleys',
    description: 'Endless rolling emerald tea plantations, cool misty climate, waterfalls, and wildlife sanctuaries.',
    highlights: ['Tea Gardens', 'Mattupetty Dam', 'Eravikulam Park', 'Top Station']
  },
  {
    id: 'coorg',
    name: 'Coorg',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    tag: 'Scotland of India',
    description: 'Aromatic coffee plantations, cascading Abbey falls, and lush green Western Ghats peaks.',
    highlights: ['Abbey Falls', 'Raja Seat', 'Coffee Estates', 'Dubare Elephant Camp']
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tag: "God's Own Country",
    description: 'Tranquil palm-fringed canals, backwaters of Alleppey, and coastal heritage in Kochi.',
    highlights: ['Alleppey Backwaters', 'Kumarakom', 'Fort Kochi', 'Varkala Beach']
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    tag: 'Sacred Pilgrimage',
    description: 'Renowned holy abode of Lord Venkateswara nestled amidst the spiritual Seven Hills of Seshachalam.',
    highlights: ['Sri Venkateswara Temple', 'Kapila Theertham', 'Silathoranam', 'Padmavathi Temple']
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
    tag: 'UNESCO Shore Heritage',
    description: 'Ancient rock-cut cave sanctuaries, shore temple architecture, and scenic East Coast Road drives.',
    highlights: ['Shore Temple', 'Pancha Rathas', 'Arjunas Penance', 'ECR Beach Scenic Drive']
  }
];
