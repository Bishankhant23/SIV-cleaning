import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import SuburbLandingView from '@/components/suburbs/SuburbLandingView';
import { getSuburbs, getSuburbBySlug, getSiteConfig } from '@/lib/api';

interface PageProps {
  params: {
    suburbSlug: string;
  };
}

export async function generateStaticParams() {
  const suburbs = await getSuburbs();
  return suburbs.map(s => ({
    suburbSlug: s.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const suburb = await getSuburbBySlug(params.suburbSlug);
  if (!suburb) {
    return { title: 'Page Not Found | SIV Cleaning' };
  }

  return {
    title: suburb.metaTitle,
    description: suburb.metaDescription,
    alternates: {
      canonical: `/${suburb.slug}`
    }
  };
}

export default async function SuburbPageRoot({ params }: PageProps) {
  const [suburb, config] = await Promise.all([
    getSuburbBySlug(params.suburbSlug),
    getSiteConfig()
  ]);

  if (!suburb) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={suburb.title}
        subtitle={`Professional ${suburb.serviceType.toLowerCase()} for commercial premises across ${suburb.suburb} and the ${suburb.council}.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/#locations' },
          { label: suburb.title }
        ]}
      />

      <SuburbLandingView
        suburb={suburb}
        config={config}
      />
    </div>
  );
}
