import { MetadataRoute } from 'next';
import { getServices, getServiceCategories, getSuburbs } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sivcleaning.com.au';
  const lastModified = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/about-us/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/services/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/contact-us/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/thank-you/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3
    }
  ];

  // Services
  const services = await getServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `${baseUrl}/service/${s.slug}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // Categories
  const categories = await getServiceCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${baseUrl}/service_category/${c.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  // All 58 Suburb Landing Pages
  const suburbs = await getSuburbs();
  const suburbRoutes: MetadataRoute.Sitemap = suburbs.map(sub => ({
    url: `${baseUrl}/${sub.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.75
  }));

  return [...staticRoutes, ...serviceRoutes, ...categoryRoutes, ...suburbRoutes];
}
