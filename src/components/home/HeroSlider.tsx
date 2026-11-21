import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import TrustPills from '@/components/common/TrustPills';
import type { HomeData } from '@/types';

interface HeroSliderProps {
  data: HomeData['hero'];
}

export default function HeroSlider({ data }: HeroSliderProps) {
  return (
    <div className="relative bg-[#083863] text-white overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: `url('${data.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#083863] via-[#083863]/95 to-[#083863]/80" />

      {/* Radiant accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00acea]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00efd1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#fedb41] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00efd1] animate-spin" style={{ animationDuration: '6s' }} />
              <span>{data.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {data.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00acea] to-[#00efd1]">
                {data.highlightText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {data.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={data.ctaPrimary.href}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#00acea] to-[#0095cb] hover:from-[#0095cb] hover:to-[#0081b0] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{data.ctaPrimary.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={data.ctaSecondary.href}
                className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>{data.ctaSecondary.label}</span>
              </a>
            </div>

            {/* Trust Pills */}
            <div className="pt-4 border-t border-white/10">
              <TrustPills pills={data.trustPills} light />
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src={data.heroImage}
                  alt="SIV Cleaning Professional Cleaners in Melbourne"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#083863]/90 via-transparent to-transparent" />

                {/* Floating overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between text-[#083863]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#083863] text-brand-gold flex items-center justify-center font-black text-lg">
                      5★
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-[#083863]">
                        Top Rated in Melbourne
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        150+ Commercial Clients Serviced
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] uppercase font-bold text-[#00acea] tracking-wider block">
                      Coverage
                    </span>
                    <span className="text-xs font-black text-[#083863]">
                      South East VIC
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Badge */}
              <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-[#fedb41] text-[#083863] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transform -rotate-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
