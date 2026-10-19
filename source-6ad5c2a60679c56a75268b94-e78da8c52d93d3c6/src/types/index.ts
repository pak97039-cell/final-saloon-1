export type ServiceCategory =
  | 'hair'
  | 'bridal'
  | 'makeup'
  | 'skincare'
  | 'nails-spa'
  | 'home-salon';

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  pricePKR: number;
  durationMinutes: number;
  description: string;
  popular?: boolean;
  image: string;
  included?: string[];
}

export interface Studio {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  whatsapp: string;
  hours: string;
  amenities: string[];
  image: string;
  googleMapsUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  pricePKR: number;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceIds?: string[];
  artistId?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  mode: 'studio' | 'home';
  homeAddress?: string;
  notes?: string;
  status: AppointmentStatus;
  totalPricePKR: number;
  addonIds: string[];
}

export interface Review {
  id: string;
  author: string;
  city: 'Islamabad' | 'Rawalpindi';
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedVisit: boolean;
}

export type GalleryCategory =
  | 'bridal'
  | 'hair'
  | 'makeup'
  | 'skincare'
  | 'nails'
  | 'interior';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  artistName?: string;
  description: string;
}
