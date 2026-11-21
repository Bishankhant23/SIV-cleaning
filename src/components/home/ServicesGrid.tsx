import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Baby,
  Stethoscope,
  Heart,
  KeyRound,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import type { ServiceItem } from '@/types';

interface ServicesGridProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
}

export default function ServicesGrid({
  services,
  title = "Our Specialized Cleaning Services",
  subtitle = "Tailored, hygienic, and reliable commercial cleaning solutions for Melbourne businesses."
}: ServicesGridProps) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'commercial-cleaning-in-melbourne':
        return <Building2 className="w-6 h-6 text-[#00acea]" />;
      case 'child-care-and-kindergarten-cleaning':
        return <Baby className="w-6 h-6 text-[#00efd1]" />;
      case 'medical-centre-cleaning':
        return <Stethoscope className="w-6 h-6 text-[#fedb41]" />;
      case 'aged-care-cleaning-services':
        return <Heart className="w-6 h-6 text-pink-400" />;
      case 'end-of-lease-cleaning-services':
        return <KeyRound className="w-6 h-6 text-[#00acea]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00acea]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#00acea] font-extrabold text-xs uppercase tracking-wider block mb-2">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#083863]/90 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    {service.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center">
                  {getIcon(service.slug)}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#083863] group-hover:text-[#00acea] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {service.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/service/${service.slug}`}
                    className="text-xs font-black uppercase tracking-wider text-[#083863] group-hover:text-[#00acea] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/#quote"
                    className="text-[11px] font-bold text-slate-400 hover:text-[#083863] transition-colors"
                  >
                    Quote →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Bonus Promo Card */}
          <div className="bg-gradient-to-br from-[#083863] to-[#05233e] rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00acea]/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="px-3 py-1 rounded-full bg-[#00acea]/20 text-[#00efd1] text-[11px] font-black uppercase tracking-wider inline-block mb-3 border border-[#00acea]/30">
                Custom Facility Package
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                Need a Bespoke Cleaning Schedule?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether you manage multiple commercial sites, a school campus, or require weekend industrial floor scrubbing, we design tailored schedules.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#quote"
                className="w-full py-3 px-4 rounded-xl bg-[#00acea] hover:bg-[#0095cb] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                <span>Request Custom Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
