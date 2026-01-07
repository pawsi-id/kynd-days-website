export interface ServiceDuration {
  minutes: number;
  price: number; // in thousands (e.g., 145 = IDR 145,000)
  happyHourPrice: number;
}

export interface Service {
  id: string;
  name: string;
  nameId: string;
  description: string;
  descriptionId: string;
  durations: ServiceDuration[];
  category: 'massage' | 'reflexology' | 'additional';
  isPopular?: boolean;
  image?: string;
}

export interface AdditionalService {
  id: string;
  name: string;
  nameId: string;
  duration: number;
  price: number;
  happyHourPrice: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BookingFormData {
  service: string;
  duration: number;
  date: Date | null;
  time: string;
  branch: string;
  name: string;
  phone: string;
  notes?: string;
}
