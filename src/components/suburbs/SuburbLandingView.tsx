import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Building,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import AppointmentForm from '@/components/common/AppointmentForm';
import type { SuburbPage, SiteConfig } from '@/types';

interface SuburbLandingViewProps {
  suburb: SuburbPage;
  config: SiteConfig;
}

export default function SuburbLandingView({
  suburb,
  config
}: SuburbLandingViewProps) {
  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Suburb Hero Banner Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-[#00acea] text-xs font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#00acea]" />
                <span>Local Service in {suburb.suburb} (VIC {suburb.postcode})</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#083863] leading-tight mb-4">
                {suburb.heading1}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {suburb.intro}
              </p>

              {/* Trust Badges Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00acea]" />
                  <span className="font-bold text-slate-700">Police Cleared Staff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span className="font-bold text-slate-700">$20M Public Liability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00efd1]" />
                  <span className="font-bold text-slate-700">Supervisor Audited</span>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-black text-[#083863] mb-6">
                {suburb.whyTitle}
              </h3>
              <div className="space-y-3.5">
                {suburb.checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#00acea] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form */}
            <AppointmentForm
              title={`Get a Quote for ${suburb.suburb}`}
              subtitle={`Request your personalized ${suburb.serviceType.toLowerCase()} quote for your facility in ${suburb.suburb}.`}
              defaultService={suburb.serviceType}
              defaultSuburb={`${suburb.suburb} ${suburb.postcode}`}
            />
          </div>

          {/* Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Local Information Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="text-sm font-black text-[#083863] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                Location Details
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Suburb:</span>
                  <span className="font-bold text-[#083863]">{suburb.suburb}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Postcode:</span>
                  <span className="font-bold text-[#083863]">{suburb.postcode}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Local Council:</span>
                  <span className="font-bold text-[#083863]">{suburb.council}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Service:</span>
                  <span className="font-bold text-[#00acea]">{suburb.serviceType}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium text-slate-500">Service Hours:</span>
                  <span className="font-bold text-slate-700">24/7 Available</span>
                </li>
              </ul>
            </div>

            {/* Nearby Suburbs Navigation */}
            {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h4 className="text-sm font-black text-[#083863] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Nearby Suburbs Serviced
                </h4>
                <div className="space-y-2">
                  {suburb.nearbySuburbs.map((nearby) => (
                    <Link
                      key={nearby.slug}
                      href={`/${nearby.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      <span>{nearby.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Immediate Phone Card */}
            <div className="bg-gradient-to-br from-[#083863] to-[#05233e] rounded-2xl p-6 text-white shadow-xl border border-white/10">
              <h4 className="text-lg font-black text-white mb-2">
                Direct Local Booking
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Call our cleaning supervisor directly for {suburb.suburb} site inspection availability.
              </p>
              <a
                href={config.phoneTel}
                className="w-full py-3 px-4 rounded-xl bg-[#00acea] hover:bg-[#0095cb] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call {config.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
