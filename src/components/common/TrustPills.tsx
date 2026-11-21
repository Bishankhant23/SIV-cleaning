import React from 'react';
import {
  ShieldCheck,
  FileCheck,
  ClipboardCheck,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import type { TrustPill } from '@/types';

interface TrustPillsProps {
  pills?: TrustPill[];
  light?: boolean;
}

export default function TrustPills({ pills, light = false }: TrustPillsProps) {
  const defaultPills: TrustPill[] = [
    { icon: 'ShieldCheck', text: 'Police Checked & Insured' },
    { icon: 'FileCheck', text: 'GST Registered' },
    { icon: 'ClipboardCheck', text: 'Regular Quality Inspections' },
    { icon: 'Clock', text: '24/7 Flexible Scheduling' }
  ];

  const items = pills || defaultPills;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#00efd1]" />;
      case 'FileCheck':
        return <FileCheck className="w-4 h-4 text-brand-gold" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-4 h-4 text-[#00acea]" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-brand-gold" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#00efd1]" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-all ${
            light
              ? 'bg-white/10 border-white/15 text-white backdrop-blur-sm'
              : 'bg-white border-slate-200 text-[#083863] shadow-sm hover:shadow'
          }`}
        >
          <div className="shrink-0">{renderIcon(item.icon)}</div>
          <span className="text-xs font-bold leading-tight tracking-tight">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}
