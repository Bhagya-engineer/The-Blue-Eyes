export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  icon: string; // Name of Lucide icon to display
  basePrice: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  guestsCount: string;
  description: string;
  features: string[];
  recommended: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  selectedPackageId: string;
  selectedServices: string[];
  customMessage: string;
  estimatedCost: number;
  bookingRef: string;
  timestamp: string;
  customMenu?: string[]; // Optional user custom food selections
  eventLocation?: string; // Optional user event location
}

export interface CateringFoodItem {
  id: string;
  name: string;
  category: 'drink' | 'starter' | 'main' | 'dessert';
  tiers: ('standard' | 'premium' | 'gourmet')[];
}

