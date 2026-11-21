import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import type { HomeData } from '@/types';

interface AboutPreviewProps {
  data: HomeData['intro'];
}

export default function AboutPreview({ data }: AboutPreviewProps) {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Imagery & Floating Stat */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                alt="SIV Cleaning Professional Melbourne Cleaners"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083863]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-[#083863] text-white p-5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00acea] text-[#083863] flex items-center justify-center font-black text-2xl">
                {data.experienceYears}
              </div>
              <div>
                <p className="text-sm font-extrabold text-white leading-tight">
                  Years of Industry
                </p>
                <p className="text-xs text-[#00efd1] font-semibold">
                  Excellence in Melbourne
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Checkmarks */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-[#00acea] font-extrabold text-xs uppercase tracking-wider block mb-2">
                {data.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight leading-tight">
                {data.title}
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.description}
            </p>

            {/* Key highlights checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00acea] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/about-us"
                className="px-6 py-3 rounded-xl bg-[#083863] hover:bg-[#00acea] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#00acea]" />
                <span>Police Clearance & Full Insurance on Every Job</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
