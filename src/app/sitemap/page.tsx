import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/common/PageHeader';
import { getServices, getServiceCategories, getSuburbs } from '@/lib/api';

export const metadata: Metadata = {
  title: 'HTML Sitemap - SIV Cleaning Melbourne',
  description: 'Complete directory of all pages, commercial cleaning services, and suburban service areas on SIV Cleaning.'
};

export default async function HtmlSitemapPage() {
  const [services, categories, suburbs] = await Promise.all([
    getServices(),
    getServiceCategories(),
    getSuburbs()
  ]);

  const officeSuburbs = suburbs.filter(s => s.serviceType === 'Office Cleaning');
  const kinderSuburbs = suburbs.filter(s => s.serviceType === 'Kindergarten Cleaning');
  const medicalSuburbs = suburbs.filter(s => s.serviceType === 'Medical Centre Cleaning');

  return (
    <div>
      <PageHeader
        title="Site Directory & Sitemap"
        subtitle="Complete index of all services, coverage areas, and company pages."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sitemap' }
        ]}
      />

      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Pages */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Main Pages
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              <li>
                <Link href="/" className="text-slate-700 hover:text-[#00acea]">
                  • Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-slate-700 hover:text-[#00acea]">
                  • About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-700 hover:text-[#00acea]">
                  • Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-slate-700 hover:text-[#00acea]">
                  • Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Cleaning Services */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Specialized Cleaning Services
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {services.map(s => (
                <li key={s.slug}>
                  <Link href={`/service/${s.slug}`} className="font-bold text-slate-700 hover:text-[#00acea]">
                    • {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Service Categories
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {categories.map(c => (
                <li key={c.slug}>
                  <Link href={`/service_category/${c.slug}`} className="font-bold text-slate-700 hover:text-[#00acea]">
                    • {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Cleaning Suburbs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Office Cleaning by Suburb ({officeSuburbs.length})
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
              {officeSuburbs.map(s => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-slate-600 hover:text-[#00acea] hover:underline">
                    • {s.suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kindergarten Cleaning Suburbs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Kindergarten Cleaning by Suburb ({kinderSuburbs.length})
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
              {kinderSuburbs.map(s => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-slate-600 hover:text-[#00acea] hover:underline">
                    • {s.suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Centre Cleaning Suburbs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-[#083863] border-b border-slate-100 pb-3 mb-4">
              Medical Centre Cleaning by Suburb ({medicalSuburbs.length})
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
              {medicalSuburbs.map(s => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-slate-600 hover:text-[#00acea] hover:underline">
                    • {s.suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
