import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  HelpCircle
} from 'lucide-react';
import AppointmentForm from '@/components/common/AppointmentForm';
import FaqAccordion from '@/components/common/FaqAccordion';
import type { ServiceItem, SiteConfig } from '@/types';

interface ServiceDetailViewProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  config: SiteConfig;
}

export default function ServiceDetailView({
  service,
  allServices,
  config
}: ServiceDetailViewProps) {
  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80 sm:h-96">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083863]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-[#00acea] text-white text-xs font-black uppercase tracking-wider mb-2 inline-block">
                  {service.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {service.title}
                </h2>
              </div>
            </div>

            {/* Service Overview Prose */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-black text-[#083863] mb-4">
                Service Overview
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.overview}
              </p>
            </div>

            {/* Scope of Work Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-[#00acea] font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Standard Checklist & Specifications</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#083863] mb-6">
                {service.scopeTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.scope.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#00acea] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-black text-[#083863] mb-6">
                Key Benefits for Your Facility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-100 bg-cyan-50/20">
                    <h4 className="text-sm font-black text-[#083863] mb-1.5">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <FaqAccordion
                  title={`${service.shortTitle} FAQs`}
                  subtitle="Common inquiries about this specific cleaning service."
                  items={service.faqs.map((f, i) => ({ id: i + 1, question: f.q, answer: f.a }))}
                />
              </div>
            )}

            {/* Quote Form */}
            <div id="service-quote">
              <AppointmentForm
                title={`Book ${service.shortTitle} Free Inspection`}
                subtitle="Submit your requirements below and our supervisor will reach out with a detailed quote."
                defaultService={service.title}
              />
            </div>
          </div>

          {/* Sidebar Area (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Services Navigation Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="text-sm font-black text-[#083863] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                All Cleaning Services
              </h4>
              <ul className="space-y-2">
                {allServices.map((s) => {
                  const isActive = s.slug === service.slug;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${isActive
                            ? 'bg-[#083863] text-white shadow-md'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#00acea]'
                          }`}
                      >
                        <span>{s.title}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#00efd1]' : 'text-slate-400'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Direct Assistance Card */}
            <div className="bg-gradient-to-br from-[#083863] to-[#05233e] rounded-2xl p-6 text-white shadow-xl border border-white/10 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#fedb41]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00efd1] block mb-1">
                24/7 Rapid Response
              </span>
              <h4 className="text-xl font-black text-white mb-2">
                Need Fast Booking or Advice?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Speak directly with our Melbourne operations team. We can schedule an on-site inspection as early as today.
              </p>
              <a
                href={config.phoneTel}
                className="w-full py-3 px-4 rounded-xl bg-[#00acea] hover:bg-[#0095cb] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Call {config.phone}</span>
              </a>
            </div>

            {/* Brochure / Quality Guarantee Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-[#00acea]" />
                <div>
                  <h5 className="text-xs font-black uppercase text-[#083863]">
                    SIV Guarantee
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Strict Inspection & Quality Sign-Off
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every cleaner is police checked and backed by our $20M public liability insurance. If you are not completely satisfied with any area, we re-clean it free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
