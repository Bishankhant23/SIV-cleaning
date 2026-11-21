import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import type { SiteConfig } from '@/types';

interface FooterProps {
  config: SiteConfig;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-[#083863] text-slate-300 relative overflow-hidden pt-16 pb-8 border-t-4 border-[#00acea]">
      {/* Background ambient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#00acea_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo-icon-white.png"
                alt="SIV Cleaning Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="text-xl font-black tracking-tight text-white">
                SIV<span className="text-[#00acea]">CLEANING</span>
              </span>
            </Link>

            <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider">
              {config.slogan}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              {config.footer.about}
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Accreditations
              </h5>
              <div className="space-y-1.5 text-xs text-slate-300">
                {config.footer.accreditations.map((acc, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00efd1] shrink-0" />
                    <span>{acc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Cleaning Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {config.footer.serviceLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#00acea] hover:translate-x-1 inline-block transition-all"
                  >
                    • {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-xs font-bold text-[#00acea] hover:underline flex items-center gap-1"
                >
                  View All Cleaning Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Suburbs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Melbourne Suburbs
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {config.footer.featuredSuburbs.map((sub, idx) => (
                <Link
                  key={idx}
                  href={sub.href}
                  className="hover:text-[#00acea] transition-colors py-0.5"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <Link
                href="/#locations"
                className="text-xs font-bold text-[#00acea] hover:underline"
              >
                Browse All 50+ Suburb Areas →
              </Link>
            </div>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#00acea] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Phone (24/7):</span>
                  <a
                    href={config.phoneTel}
                    className="font-bold text-white hover:text-brand-gold text-sm transition-colors"
                  >
                    {config.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#00acea] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Email:</span>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    {config.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00acea] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Head Office & Coverage:</span>
                  <span className="text-slate-300">{config.address}</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Availability:</span>
                  <span className="text-slate-300">{config.workingHours}</span>
                </div>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/#quote"
                className="block text-center py-2.5 px-4 rounded-lg bg-[#00acea] hover:bg-[#0095cb] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Book Inspection / Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>{config.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              HTML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
