'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Send,
  Phone,
  CheckCircle,
  Calendar,
  Building,
  User,
  Mail,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface AppointmentFormProps {
  title?: string;
  subtitle?: string;
  defaultService?: string;
  defaultSuburb?: string;
  compact?: boolean;
}

export default function AppointmentForm({
  title = "Request a Free Quote",
  subtitle = "Tell us about your premises. We will inspect your site and provide a custom quote.",
  defaultService = "Office Cleaning",
  defaultSuburb = "",
  compact = false
}: AppointmentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    suburb: defaultSuburb,
    frequency: 'Weekly',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to send your request. Please try calling us directly.');
      }

      // Successful submission -> redirect to thank you page
      router.push('/thank-you');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call 04 3245 2788.');
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 ${compact ? 'p-6' : 'p-8 sm:p-10'}`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[#00acea] font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span>No Obligation Free Estimation</span>
        </div>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl sm:text-3xl'} font-black text-[#083863]`}>
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0412 345 678"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com.au"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Suburb / Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Premises Suburb *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="suburb"
                required
                value={formData.suburb}
                onChange={handleChange}
                placeholder="e.g. Cranbourne / Berwick"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Service Needed */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Service Type
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800 bg-white"
              >
                <option value="Commercial Office Cleaning">Commercial Office Cleaning</option>
                <option value="Child Care & Kindergarten Cleaning">Child Care & Kindergarten Cleaning</option>
                <option value="Medical Centre Cleaning">Medical Centre Cleaning</option>
                <option value="Aged Care Cleaning">Aged Care Cleaning</option>
                <option value="End of Lease Cleaning">End of Lease Cleaning</option>
                <option value="General Commercial Cleaning">General Commercial Cleaning</option>
              </select>
            </div>
          </div>

          {/* Cleaning Frequency */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Frequency
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800 bg-white"
              >
                <option value="Daily">Daily</option>
                <option value="2-3 Times a Week">2 - 3 Times a Week</option>
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="One-Off / End of Lease">One-Off / End of Lease</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message / Special Requirements */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Facility Details & Specific Requirements
          </label>
          <textarea
            name="message"
            rows={compact ? 2 : 3}
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g. Approx 350 sqm office, 2 bathrooms, 1 kitchen. Need after-hours cleaning on Tuesday & Friday."
            className="w-full p-3 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#00acea] focus:ring-2 focus:ring-[#00acea]/20 transition-all text-slate-800"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 px-6 rounded-lg bg-[#00acea] hover:bg-[#0095cb] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
        >
          {submitting ? (
            <span>Submitting Request...</span>
          ) : (
            <>
              <span>Get Free Quotation & Site Inspection</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          🔒 Your details are secure and strictly confidential. No spam guaranteed.
        </p>
      </form>
    </div>
  );
}
