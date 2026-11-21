import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import ServicesGrid from '@/components/home/ServicesGrid';
import AppointmentForm from '@/components/common/AppointmentForm';
import { getServiceCategories, getServiceCategoryBySlug, getServices } from '@/lib/api';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await getServiceCategories();
  return categories.map(c => ({
    slug: c.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getServiceCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found | SIV Cleaning' };
  }

  return {
    title: `${category.title} Services | SIV Cleaning Melbourne`,
    description: category.description,
    alternates: {
      canonical: `/service_category/${category.slug}`
    }
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const [category, allServices] = await Promise.all([
    getServiceCategoryBySlug(params.slug),
    getServices()
  ]);

  if (!category) {
    notFound();
  }

  const matchingServices = allServices.filter(s =>
    category.services.includes(s.slug) || s.categorySlug === category.slug
  );

  return (
    <div>
      <PageHeader
        title={category.title}
        subtitle={category.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.title }
        ]}
      />

      <div className="py-12">
        <ServicesGrid
          services={matchingServices.length > 0 ? matchingServices : allServices}
          title={`${category.title} in Melbourne`}
          subtitle={category.description}
        />
      </div>

      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm
            title={`Get a Quote for ${category.title}`}
            subtitle="Let our team evaluate your facility and furnish a clear, transparent quotation."
            defaultService={category.title}
          />
        </div>
      </div>
    </div>
  );
}
