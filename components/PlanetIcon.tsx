import React from 'react';

interface PlanetIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const PlanetIcon: React.FC<PlanetIconProps> = ({ className = "w-6 h-6", ...props }) => (
<svg 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  strokeLinecap="round" 
  strokeLinejoin="round"
>
  {/* Main Circle — keep as is */}
  <circle cx="12" cy="12" r="10" strokeWidth="2" />
  
  {/* Grid lines — thinner */}
  <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1" />
  <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1" />

  <path d="M 2.8 7.8 Q 12 4.5 21.2 7.8" strokeWidth="1" fill="none" />
  <path d="M 2.8 16.2 Q 12 19.5 21.2 16.2" strokeWidth="1" fill="none" />
  <path d="M 7.8 2.8 Q 4.5 12 7.8 21.2" strokeWidth="1" fill="none" />
  <path d="M 16.2 2.8 Q 19.5 12 16.2 21.2" strokeWidth="1" fill="none" />
</svg>

);