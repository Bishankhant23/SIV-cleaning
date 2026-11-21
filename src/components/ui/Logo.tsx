import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  theme?: 'navy' | 'white';
  className?: string;
  width?: number | string;
  height?: number | string;
  companyName?: string;
  slogan?: string;
}

export default function Logo({
  variant = 'icon',
  theme = 'navy',
  className = '',
  width,
  height,
  companyName = 'SIV Cleaning',
  slogan = 'Commercial Cleaning Services'
}: LogoProps) {
  const isWhite = theme === 'white';
  const navyColor = isWhite ? '#ffffff' : '#083863';
  const cyanColor = '#00acea';

  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="1140 780 1470 1520"
        width={width || '100%'}
        height={height || '100%'}
        className={className}
        aria-label="Cleaning Services Logo Emblem"
      >
        <use href="/images/logo-icon.svg#icon" />
        <image
          href={isWhite ? '/images/logo-icon-white.svg' : '/images/logo-icon.svg'}
          width="100%"
          height="100%"
        />
      </svg>
    );
  }

  if (variant === 'full') {
    return (
      <img
        src={isWhite ? '/images/logo-white.svg' : '/images/logo.svg'}
        alt="Cleaning Services Logo"
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // Horizontal lockup (Emblem on left + Brand text on right)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 shrink-0">
        <img
          src={isWhite ? '/images/logo-icon-white.svg' : '/images/logo-icon.svg'}
          alt="Logo Icon"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${isWhite ? 'text-white' : 'text-[#083863]'
            }`}
        >
          {companyName.includes(' ') ? (
            <>
              {companyName.split(' ')[0]}
              <span className="text-[#00acea]">{companyName.slice(companyName.indexOf(' '))}</span>
            </>
          ) : (
            companyName
          )}
        </span>
        {slogan && (
          <span
            className={`text-[10px] uppercase font-bold tracking-widest mt-0.5 ${isWhite ? 'text-slate-300' : 'text-slate-400'
              }`}
          >
            {slogan}
          </span>
        )}
      </div>
    </div>
  );
}
