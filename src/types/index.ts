export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Luxury' | 'Structural' | 'Custom';
  description: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  tag: string;
  specs: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  location: string;
  projectType: string;
  requirements: string;
}
