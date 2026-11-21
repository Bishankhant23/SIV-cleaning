import React from 'react';
import { Target, Compass, Award, ShieldCheck } from 'lucide-react';
import type { AboutData } from '@/types';

interface MissionVisionProps {
  data: AboutData['missionVision'];
  values: AboutData['values'];
}

export default function MissionVision({ data, values }: MissionVisionProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-[#00acea] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#083863] mb-4">
                {data.mission.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {data.mission.description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#fedb41] mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#083863] mb-4">
                {data.vision.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {data.vision.description}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#00acea] font-bold text-xs uppercase tracking-wider block mb-1">
              Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#083863]">
              The Core Values We Live By
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#083863] text-white flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-black text-[#083863] mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
