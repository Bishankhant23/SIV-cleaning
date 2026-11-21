import fs from 'fs/promises';
import path from 'path';
import type {
  SiteConfig,
  HomeData,
  AboutData,
  ServiceItem,
  ServiceCategory,
  SuburbPage,
  Testimonial,
  FaqItem,
  ContactData
} from '@/types';

const dataDirectory = path.join(process.cwd(), 'src', 'data');

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return readJsonFile<SiteConfig>('site-config.json');
}

export async function getHomeData(): Promise<HomeData> {
  return readJsonFile<HomeData>('home.json');
}

export async function getAboutData(): Promise<AboutData> {
  return readJsonFile<AboutData>('about.json');
}

export async function getServices(): Promise<ServiceItem[]> {
  return readJsonFile<ServiceItem[]>('services.json');
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const services = await getServices();
  return services.find(s => s.slug === slug);
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  return readJsonFile<ServiceCategory[]>('service-categories.json');
}

export async function getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | undefined> {
  const categories = await getServiceCategories();
  return categories.find(c => c.slug === slug);
}

export async function getSuburbs(): Promise<SuburbPage[]> {
  return readJsonFile<SuburbPage[]>('suburbs.json');
}

export async function getSuburbBySlug(slug: string): Promise<SuburbPage | undefined> {
  const suburbs = await getSuburbs();
  return suburbs.find(s => s.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return readJsonFile<Testimonial[]>('testimonials.json');
}

export async function getFaqs(): Promise<FaqItem[]> {
  return readJsonFile<FaqItem[]>('faqs.json');
}

export async function getContactData(): Promise<ContactData> {
  return readJsonFile<ContactData>('contact.json');
}
