import React from 'react';

export const PortalIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 256 256" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <filter id="icon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="256" height="256" rx="60" fill="#000000"/>
    <path 
      d="M128 46C173.287 46 210 82.7127 210 128C210 173.287 173.287 210 128 210C82.7127 210 46 173.287 46 128C46 99.5 59.5 74.5 80 59" 
      stroke="#14F03C" 
      strokeWidth="16" 
      strokeLinecap="round"
      filter="url(#icon-glow)"
    />
    <path 
      d="M128 82C153.405 82 174 102.595 174 128C174 153.405 153.405 174 128 174C102.595 174 82 153.405 82 128C82 110 90 95 102 87" 
      stroke="#14DC3C" 
      strokeWidth="12" 
      strokeLinecap="round"
    />
    <circle cx="128" cy="128" r="20" fill="#14F03C" />
  </svg>
);