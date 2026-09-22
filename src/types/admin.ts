export interface TourPackageDB {
  id: string;
  name: string;
  state: string;
  subtitle: string;
  description: string;
  places: string[];
  image_url: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleDB {
  id: string;
  name: string;
  type: string;
  description: string;
  image_url: string;
  seating_capacity: string;
  status: 'Available' | 'Booked' | 'Maintenance';
  created_at?: string;
  updated_at?: string;
}

export interface BookingDB {
  id: string;
  booking_reference: string;
  customer_name: string;
  phone: string;
  email?: string;
  pickup_location: string;
  destination: string;
  travel_date: string;
  return_date?: string;
  vehicle: string;
  package_name?: string;
  passengers: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EnquiryDB {
  id: string;
  name: string;
  phone: string;
  email?: string;
  route?: string;
  travel_date?: string;
  vehicle_required?: string;
  passengers?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Resolved';
  created_at?: string;
  updated_at?: string;
}

export interface GalleryDB {
  id: string;
  title: string;
  image_url: string;
  category: 'Fleet' | 'Travel' | 'Journeys';
  description?: string;
  is_active: boolean;
  created_at?: string;
}

export interface WebsiteSettingsDB {
  company_name: string;
  proprietor: string;
  phone: string;
  secondary_phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  youtube: string;
  facebook: string;
}
