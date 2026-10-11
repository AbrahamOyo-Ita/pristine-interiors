export type StockStatus = 'in-stock' | 'made-to-order' | 'out-of-stock';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  /** Sample price in NGN. null = price on request. All prices are demonstration values until verified. */
  price: number | null;
  description: string;
  images: string[];
  stock: StockStatus;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  cover: string;
  images: string[];
  summary: string;
  approach: string;
  materials: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  points: string[];
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
}

export type EnquiryStatus = 'new' | 'replied' | 'closed';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type ConsultationStatus = 'new' | 'contacted' | 'scheduled' | 'closed';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  preferredDate: string;
  description: string;
  status: ConsultationStatus;
  createdAt: string;
}

export interface Session {
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface Settings {
  heroHeadline: string;
  heroHighlight: string;
  heroSub: string;
  featuredProductIds: string[];
  featuredProjectIds: string[];
  showTestimonials: boolean;
  showServices: boolean;
}

export interface DB {
  products: Product[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  consultations: ConsultationRequest[];
  sessions: Session[];
  settings: Settings;
}

export interface CartItem {
  slug: string;
  qty: number;
}
