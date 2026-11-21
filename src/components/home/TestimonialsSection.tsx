import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  testimonials,
  title = "Customer Feedback & Reviews",
  subtitle = "See what business owners, school directors, and clinic managers in Melbourne say about SIV Cleaning."
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified Melbourne Client Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#fedb41] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#fedb41]" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-slate-200 mb-2" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#083863]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#00acea] font-semibold">
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
