'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Building2, Baby, Stethoscope } from 'lucide-react';
import type { SuburbPage } from '@/types';

interface SuburbsDirectoryProps {
  suburbs: SuburbPage[];
}

export default function SuburbsDirectory({ suburbs }: SuburbsDirectoryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'Office Cleaning' | 'Kindergarten Cleaning' | 'Medical Centre Cleaning'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuburbs = suburbs.filter(sub => {
    const matchesTab = activeTab === 'all' || sub.serviceType === activeTab;
    const matchesQuery = sub.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.postcode.includes(searchQuery);
    return matchesTab && matchesQuery;
  });

  return (
    <section id="locations" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#00acea] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local South East Melbourne Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#083863] tracking-tight">
            Commercial Cleaning Suburbs We Service
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Explore our specialized local cleaning teams across 20+ South East Melbourne hubs and councils.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#083863] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              All Locations ({suburbs.length})
            </button>
            <button
              onClick={() => setActiveTab('Office Cleaning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'Office Cleaning'
                  ? 'bg-[#083863] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Office Cleaning</span>
            </button>
            <button
              onClick={() => setActiveTab('Kindergarten Cleaning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'Kindergarten Cleaning'
                  ? 'bg-[#083863] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>Kindergarten</span>
            </button>
            <button
              onClick={() => setActiveTab('Medical Centre Cleaning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'Medical Centre Cleaning'
                  ? 'bg-[#083863] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Medical Centre</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by suburb or postcode..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00acea] text-slate-800"
            />
          </div>
        </div>

        {/* Suburbs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredSuburbs.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-[#00acea] hover:bg-cyan-50/30 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.serviceType.replace(' Cleaning', '')}
                </span>
                <span className="text-xs font-extrabold text-[#083863] group-hover:text-[#00acea] transition-colors leading-tight block mt-0.5">
                  {item.suburb}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
                <span>VIC {item.postcode}</span>
                <span className="text-[#00acea] font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredSuburbs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No suburbs matched your filter. Please try searching for another suburb.
          </div>
        )}
      </div>
    </section>
  );
}
