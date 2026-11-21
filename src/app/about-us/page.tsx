import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/common/PageHeader';
import MissionVision from '@/components/about/MissionVision';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsCounter from '@/components/home/StatsCounter';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AppointmentForm from '@/components/common/AppointmentForm';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { getAboutData, getHomeData, getTestimonials } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData();
  return {
    title: data.meta.title,
    description: data.meta.description
  };
}

export default async function AboutUsPage() {
  const [aboutData, homeData, testimonials] = await Promise.all([
    getAboutData(),
    getHomeData(),
    getTestimonials()
  ]);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
        breadcrumbs={aboutData.hero.breadcrumbs}
      />

      {/* Main Story Narrative */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[#00acea] font-extrabold text-xs uppercase tracking-wider block mb-2">
                  {aboutData.story.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight">
                  {aboutData.story.title}
                </h2>
              </div>

              {aboutData.story.paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-2 flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#083863]">
                  <ShieldCheck className="w-5 h-5 text-[#00acea]" />
                  <span>Police Checked & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#083863]">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  <span>GST Registered</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="SIV Cleaning Team"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <MissionVision
        data={aboutData.missionVision}
        values={aboutData.values}
      />

      {/* Stats Counter */}
      <StatsCounter stats={homeData.stats} />

      {/* Why Choose Us */}
      <WhyChooseUs data={homeData.whyChooseUs} />

      {/* Customer Feedback */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Quote Form */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm
            title="Ready to Experience the SIV Difference?"
            subtitle="Request an on-site visit and free quotation tailored to your premises."
          />
        </div>
      </section>
    </div>
  );
}
