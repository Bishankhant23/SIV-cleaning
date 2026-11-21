import React from 'react';
import type { StatItem } from '@/types';

interface StatsCounterProps {
  stats: StatItem[];
  title?: string;
}

export default function StatsCounter({
  stats,
  title = "Our Proven Track Record Across Melbourne"
}: StatsCounterProps) {
  return (
    <section className="bg-[#083863] text-white py-14 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#00acea_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <p className="text-center text-xs font-bold text-[#fedb41] uppercase tracking-widest mb-10">
            {title}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="pt-6 md:pt-0 px-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00efd1]">
                {stat.value}
              </div>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
