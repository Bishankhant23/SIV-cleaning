import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, Phone, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { getSiteConfig } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Thank You - SIV Cleaning',
  description: 'Thank you for contacting SIV Cleaning Melbourne. We have received your inquiry and will be in touch shortly.'
};

export default async function ThankYouPage() {
  const config = await getSiteConfig();

  return (
    <div className="py-20 sm:py-28 bg-slate-50 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[#00acea] font-extrabold text-xs uppercase tracking-wider block mb-2">
          Request Received
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-[#083863] tracking-tight mb-4">
          THANK YOU FOR CONTACTING US
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          We have received your details. One of our Melbourne cleaning supervisors will review your request and get back to you with a tailored quote very soon.
        </p>

        {/* Rapid Contact Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#083863]">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span>Need an urgent response or immediate site visit?</span>
          </div>
          <p className="text-xs text-slate-500">
            You can call our duty manager directly on our 24/7 commercial line:
          </p>
          <a
            href={config.phoneTel}
            className="flex items-center gap-2 text-lg font-black text-[#00acea] hover:underline"
          >
            <Phone className="w-5 h-5 text-brand-gold" />
            <span>{config.phone}</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#083863] hover:bg-[#00acea] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#083863] font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
