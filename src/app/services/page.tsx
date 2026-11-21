import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/common/PageHeader';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FaqAccordion from '@/components/common/FaqAccordion';
import AppointmentForm from '@/components/common/AppointmentForm';
import { getServices, getHomeData, getFaqs } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Commercial Cleaners Near Me | Office Cleaners Melbourne | SIV Cleaning',
  description: 'Explore our full suite of commercial, office, childcare, medical, and aged care cleaning services in Melbourne. Tailored checklists, police-checked cleaners, and guaranteed quality.'
};

export default async function ServicesPage() {
  const [services, homeData, faqs] = await Promise.all([
    getServices(),
    getHomeData(),
    getFaqs()
  ]);

  return (
    <div>
      <PageHeader
        title="Commercial Cleaning Services"
        subtitle="Explore our comprehensive suite of facility cleaning and sanitisation programs across Melbourne South East."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' }
        ]}
      />

      {/* Services Grid */}
      <ServicesGrid
        services={services}
        title="Choose Your Preferred Service"
        subtitle="We cater to offices, kindergartens, healthcare practices, and residential care providers."
      />

      {/* Why Choose Us */}
      <WhyChooseUs data={homeData.whyChooseUs} />

      {/* FAQs */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={faqs}
            title="Commercial Cleaning FAQs"
            subtitle="Frequently asked questions about our service scope and agreements."
          />
        </div>
      </section>

      {/* Quote Request */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm
            title="Make An Appointment"
            subtitle="Let our team evaluate your premises and furnish a clear, competitive quotation."
          />
        </div>
      </section>
    </div>
  );
}
