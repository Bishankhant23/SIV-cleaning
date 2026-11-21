import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/common/PageHeader';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import AppointmentForm from '@/components/common/AppointmentForm';
import { getContactData } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactData();
  return {
    title: data.meta.title,
    description: data.meta.description
  };
}

export default async function ContactUsPage() {
  const contactData = await getContactData();

  return (
    <div>
      <PageHeader
        title={contactData.heading}
        subtitle={contactData.intro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' }
        ]}
      />

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactInfoCards details={contactData.details} />
        </div>
      </section>

      {/* Form and Map Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <AppointmentForm
                title="Send Us a Message"
                subtitle="Fill out the form below and one of our Melbourne commercial cleaning supervisors will respond promptly."
              />
            </div>

            {/* Map & Office Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-[#083863] mb-3">
                  Service Area & Head Office
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Our operational teams are stationed strategically across Melbourne South East, providing quick dispatch, emergency callouts, and localized supervision from Dandenong to Pakenham and beyond.
                </p>

                {/* Google Map Embed */}
                <div className="rounded-xl overflow-hidden border border-slate-200 h-80 sm:h-96 w-full">
                  <iframe
                    src={contactData.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SIV Cleaning Melbourne Coverage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
