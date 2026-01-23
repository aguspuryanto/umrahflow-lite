
export interface Package {
  id: string;
  title: string;
  type: 'Umrah' | 'Hajj' | 'Tour';
  duration: string;
  price: number;
  images: string[];
  airline: string;
  hotelMecca: string;
  hotelMadinah: string;
  departureDate: string;
  slots: number;
  available: number;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  category: 'Tips' | 'Pengalaman' | 'Doa' | 'Tanya';
}

export interface Review {
  id: string;
  packageId?: string;
  agencyId?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'Hotel' | 'Mosque' | 'Historical' | 'Meeting';
  lat: number;
  lng: number;
  description: string;
  city: 'Mecca' | 'Madinah' | 'Other';
}

export interface Pilgrim {
  id: string;
  fullName: string;
  passportNumber: string;
  packageId: string;
  status: 'Draft' | 'Partial Paid' | 'Paid' | 'Documents Pending' | 'Ready';
  registrationDate: string;
}

export enum AppView {
  LANDING = 'LANDING',
  PACKAGES = 'PACKAGES',
  DASHBOARD = 'DASHBOARD',
  BOOKING = 'BOOKING',
  COMMUNITY = 'COMMUNITY',
  MAP = 'MAP'
}
