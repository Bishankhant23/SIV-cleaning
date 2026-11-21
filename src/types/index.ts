export interface NavChild {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavChild[];
  isMegaMenu?: boolean;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  slogan: string;
  phone: string;
  phoneRaw: string;
  phoneTel: string;
  email: string;
  address: string;
  workingHours: string;
  abn: string;
  insurance: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  navigation: NavigationItem[];
  footer: {
    about: string;
    quickLinks: { label: string; href: string }[];
    serviceLinks: { label: string; href: string }[];
    featuredSuburbs: { label: string; href: string }[];
    accreditations: string[];
    copyright: string;
  };
}

export interface TrustPill {
  icon: string;
  text: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface HomeData {
  hero: {
    badge: string;
    title: string;
    highlightText: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    trustPills: TrustPill[];
    heroImage: string;
  };
  intro: {
    subtitle: string;
    title: string;
    description: string;
    highlights: string[];
    experienceYears: string;
    cleaningsCompleted: string;
  };
  whyChooseUs: {
    subtitle: string;
    title: string;
    description: string;
    features: FeatureItem[];
  };
  stats: StatItem[];
  appointmentSection: {
    subtitle: string;
    title: string;
    description: string;
    phoneNotice: string;
    phoneNumber: string;
  };
}

export interface AboutData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    breadcrumbs: { label: string; href: string }[];
  };
  missionVision: {
    mission: { title: string; description: string };
    vision: { title: string; description: string };
  };
  story: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  values: { title: string; description: string }[];
}

export interface ServiceItem {
  slug: string;
  categorySlug: string;
  title: string;
  shortTitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  heroImage: string;
  overview: string;
  scopeTitle: string;
  scope: string[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  services: string[];
}

export interface SuburbPage {
  slug: string;
  serviceType: string;
  suburb: string;
  postcode: string;
  council: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading1: string;
  intro: string;
  whyTitle: string;
  checklist: string[];
  nearbySuburbs: { name: string; slug: string }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  quote: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface ContactData {
  meta: {
    title: string;
    description: string;
  };
  heading: string;
  subtitle: string;
  intro: string;
  details: {
    phone: string;
    phoneTel: string;
    email: string;
    address: string;
    operatingHours: string;
    serviceAreas: string;
  };
  mapEmbedUrl: string;
}
