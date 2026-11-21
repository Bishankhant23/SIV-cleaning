'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import type { SiteConfig } from '@/types';

interface HeaderProps {
  config: SiteConfig;
}

export default function Header({ config }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#083863] text-white text-xs sm:text-sm py-2.5 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>{config.workingHours}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Servicing Melbourne South East</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{config.email}</span>
            </a>
            <a
              href={config.phoneTel}
              className="flex items-center gap-1.5 font-bold text-brand-gold hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {config.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
          ? 'fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-lg py-3 z-50'
          : 'bg-white py-4 shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo-icon.png"
              alt="SIV Cleaning Logo"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#083863] leading-none">
                SIV<span className="text-[#00acea]">CLEANING</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                Commercial & Facility
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${pathname === '/'
                ? 'text-[#00acea] border-b-2 border-[#00acea] pb-1'
                : 'text-[#083863] hover:text-[#00acea]'
                }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`text-sm font-semibold transition-colors ${pathname === '/about-us'
                ? 'text-[#00acea] border-b-2 border-[#00acea] pb-1'
                : 'text-[#083863] hover:text-[#00acea]'
                }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`text-sm font-semibold flex items-center gap-1 transition-colors ${pathname.startsWith('/service')
                  ? 'text-[#00acea] border-b-2 border-[#00acea] pb-1'
                  : 'text-[#083863] hover:text-[#00acea]'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-3 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-bold text-[#083863] uppercase tracking-wider">
                        Specialized Cleaning
                      </p>
                    </div>
                    <Link
                      href="/service/commercial-cleaning-in-melbourne"
                      className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      Commercial Office Cleaning
                    </Link>
                    <Link
                      href="/service/child-care-and-kindergarten-cleaning"
                      className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      Child Care & Kindergarten Cleaning
                    </Link>
                    <Link
                      href="/service/medical-centre-cleaning"
                      className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      Medical Centre Cleaning
                    </Link>
                    <Link
                      href="/service/aged-care-cleaning-services"
                      className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      Aged Care Facility Cleaning
                    </Link>
                    <Link
                      href="/service/end-of-lease-cleaning-services"
                      className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#00acea] transition-colors"
                    >
                      End of Lease Make-Good Cleaning
                    </Link>
                    <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                      <Link
                        href="/services"
                        className="text-xs font-bold text-[#00acea] hover:underline"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#locations"
              className="text-sm font-semibold text-[#083863] hover:text-[#00acea] transition-colors"
            >
              Locations
            </Link>

            <Link
              href="/contact-us"
              className={`text-sm font-semibold transition-colors ${pathname === '/contact-us'
                ? 'text-[#00acea] border-b-2 border-[#00acea] pb-1'
                : 'text-[#083863] hover:text-[#00acea]'
                }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={config.phoneTel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-[#083863] border border-slate-200 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#00acea]" />
              <span>{config.phone}</span>
            </a>

            <Link
              href="/#quote"
              className="px-5 py-2.5 rounded-lg bg-[#00acea] hover:bg-[#0095cb] text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#083863] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-3 shadow-xl">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md font-semibold text-sm text-[#083863] hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="block px-3 py-2 rounded-md font-semibold text-sm text-[#083863] hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 rounded-md font-semibold text-sm text-[#083863] hover:bg-slate-50"
            >
              All Services
            </Link>
            <div className="pl-4 space-y-1.5 border-l-2 border-[#00acea]/30 ml-3">
              <Link
                href="/service/commercial-cleaning-in-melbourne"
                className="block py-1 text-xs text-slate-600 hover:text-[#00acea]"
              >
                • Office Cleaning
              </Link>
              <Link
                href="/service/child-care-and-kindergarten-cleaning"
                className="block py-1 text-xs text-slate-600 hover:text-[#00acea]"
              >
                • Kindergarten Cleaning
              </Link>
              <Link
                href="/service/medical-centre-cleaning"
                className="block py-1 text-xs text-slate-600 hover:text-[#00acea]"
              >
                • Medical Centre Cleaning
              </Link>
              <Link
                href="/service/aged-care-cleaning-services"
                className="block py-1 text-xs text-slate-600 hover:text-[#00acea]"
              >
                • Aged Care Cleaning
              </Link>
              <Link
                href="/service/end-of-lease-cleaning-services"
                className="block py-1 text-xs text-slate-600 hover:text-[#00acea]"
              >
                • End of Lease Cleaning
              </Link>
            </div>
            <Link
              href="/#locations"
              className="block px-3 py-2 rounded-md font-semibold text-sm text-[#083863] hover:bg-slate-50"
            >
              Suburbs Directory
            </Link>
            <Link
              href="/contact-us"
              className="block px-3 py-2 rounded-md font-semibold text-sm text-[#083863] hover:bg-slate-50"
            >
              Contact Us
            </Link>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={config.phoneTel}
                className="w-full text-center py-2.5 rounded-lg bg-slate-100 text-[#083863] text-sm font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00acea]" />
                <span>Call {config.phone}</span>
              </a>
              <Link
                href="/#quote"
                className="w-full text-center py-2.5 rounded-lg bg-[#00acea] text-white text-sm font-bold shadow"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
