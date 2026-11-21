import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import ServiceDetailView from '@/components/services/ServiceDetailView';
import { getServices, getServiceBySlug, getSiteConfig } from '@/lib/api';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map(s => ({
    slug: s.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return { title: 'Service Not Found | SIV Cleaning' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/service/${service.slug}`
    }
  };
}

export default async function SingleServicePage({ params }: PageProps) {
  const [service, allServices, config] = await Promise.all([
    getServiceBySlug(params.slug),
    getServices(),
    getSiteConfig()
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={service.title}
        subtitle={service.excerpt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title }
        ]}
        bgImage={service.heroImage}
      />

      <ServiceDetailView
        service={service}
        allServices={allServices}
        config={config}
      />
    </div>
  );
}
