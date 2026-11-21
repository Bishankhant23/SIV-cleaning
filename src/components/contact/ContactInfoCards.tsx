import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import type { ContactData } from '@/types';

interface ContactInfoCardsProps {
  details: ContactData['details'];
}

export default function ContactInfoCards({ details }: ContactInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Phone */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00acea] mb-4">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Direct Phone
          </span>
          <a
            href={details.phoneTel}
            className="text-base sm:text-lg font-black text-[#083863] hover:text-[#00acea] transition-colors block mt-1"
          >
            {details.phone}
          </a>
          <p className="text-[11px] text-slate-500 mt-1">Available 24/7 for emergency bookings</p>
        </div>
      </div>

      {/* Email */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#083863] mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Email Inquiries
          </span>
          <a
            href={`mailto:${details.email}`}
            className="text-xs sm:text-sm font-bold text-[#083863] hover:text-[#00acea] transition-colors block mt-1 break-all"
          >
            {details.email}
          </a>
          <p className="text-[11px] text-slate-500 mt-1">Quotes replied within 24 hours</p>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Operating Hours
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#083863] block mt-1">
            {details.operatingHours}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Flexible after-hours & weekends</p>
        </div>
      </div>

      {/* Service Coverage */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Service Coverage
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#083863] block mt-1">
            {details.serviceAreas}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Victoria, Australia</p>
        </div>
      </div>
    </div>
  );
}
