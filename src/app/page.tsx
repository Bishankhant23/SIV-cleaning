import React from 'react';
import type { Metadata } from 'next';
import HeroSlider from '@/components/home/HeroSlider';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsCounter from '@/components/home/StatsCounter';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SuburbsDirectory from '@/components/home/SuburbsDirectory';
import FaqAccordion from '@/components/common/FaqAccordion';
import AppointmentForm from '@/components/common/AppointmentForm';
import {
  getHomeData,
  getServices,
  getSuburbs,
  getTestimonials,
  getFaqs,
  getSiteConfig
} from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Commercial Cleaning Melbourne | Office Cleaning Services | SIV Cleaning',
    description: 'When it comes to maintaining a clean and inviting office in Melbourne, delegation is paramount. At SIV Cleaning, we provide high quality professional commercial cleaning services tailored to Melbourne businesses.'
  };
}

export default async function HomePage() {
  const [homeData, services, suburbs, testimonials, faqs, config] = await Promise.all([
    getHomeData(),
    getServices(),
    getSuburbs(),
    getTestimonials(),
    getFaqs(),
    getSiteConfig()
  ]);

  return (
    <div className="w-full">
      {/* 1. Hero Banner */}
      <HeroSlider data={homeData.hero} />

      {/* 2. About Preview */}
      <AboutPreview data={homeData.intro} />

      {/* 3. Core Services Grid */}
      <ServicesGrid services={services} />

      {/* 4. Why Choose Us (9 Pillars) */}
      <WhyChooseUs data={homeData.whyChooseUs} />

      {/* 5. Proven Track Record Numbers */}
      <StatsCounter stats={homeData.stats} />

      {/* 6. Customer Feedback & Reviews */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. Suburbs Directory (All 58 Suburb Landing Pages) */}
      <SuburbsDirectory suburbs={suburbs} />

      {/* 8. Frequently Asked Questions */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={faqs}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our commercial and facility cleaning agreements."
          />
        </div>
      </section>

      {/* 9. Appointment & Quote Request Section */}
      <section id="quote" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#00acea] font-bold text-xs uppercase tracking-wider block mb-1">
              {homeData.appointmentSection.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863]">
              {homeData.appointmentSection.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              {homeData.appointmentSection.description}
            </p>
          </div>

          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}
