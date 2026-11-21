import React from 'react';
import {
  SearchCheck,
  Users,
  Baby,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  CalendarCheck,
  Leaf,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import type { HomeData } from '@/types';

interface WhyChooseUsProps {
  data: HomeData['whyChooseUs'];
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'inspection':
        return <SearchCheck className="w-5 h-5 text-[#00acea]" />;
      case 'trusted-team':
        return <Users className="w-5 h-5 text-[#083863]" />;
      case 'wwcc':
        return <Baby className="w-5 h-5 text-[#00efd1]" />;
      case 'quality':
        return <Sparkles className="w-5 h-5 text-brand-gold" />;
      case 'insurance':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'family-owned':
        return <HeartHandshake className="w-5 h-5 text-indigo-500" />;
      case 'flexibility':
        return <CalendarCheck className="w-5 h-5 text-emerald-500" />;
      case 'eco':
        return <Leaf className="w-5 h-5 text-green-500" />;
      case 'local':
        return <MapPin className="w-5 h-5 text-[#00acea]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#00acea]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00acea] font-extrabold text-xs uppercase tracking-wider block mb-2">
            {data.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#00acea]/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#083863] shadow-sm flex items-center justify-center transition-colors mb-4 border border-slate-100">
                {getIcon(feature.id)}
              </div>
              <h3 className="text-base font-extrabold text-[#083863] group-hover:text-[#00acea] transition-colors mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
