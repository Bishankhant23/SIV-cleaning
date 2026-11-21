import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
}

export default function Breadcrumbs({ items, className = '', light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href="/"
            className={`flex items-center gap-1 transition-colors ${
              light ? 'text-slate-200 hover:text-white' : 'text-slate-500 hover:text-[#083863]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li>
                <ChevronRight className={`w-3.5 h-3.5 ${light ? 'text-white/40' : 'text-slate-400'}`} />
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      light ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-[#083863]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`font-bold ${
                      light ? 'text-[#fedb41]' : 'text-[#083863]'
                    }`}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
