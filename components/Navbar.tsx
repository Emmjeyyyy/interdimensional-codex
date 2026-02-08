import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Crosshair, Terminal, Radio } from 'lucide-react';
import { PortalIcon } from './PortalIcon';
import { PlanetIcon } from './PlanetIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Subjects', path: '/characters', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Sectors', path: '/locations', icon: <PlanetIcon className="w-5 h-5" /> },
    { name: 'Logs', path: '/episodes', icon: <Radio className="w-4 h-4" /> },
    { name: 'Tracked', path: '/favorites', icon: <Crosshair className="w-4 h-4" /> },
  ];

  const getIsActive = (itemPath: string, navLinkIsActive: boolean) => {
    if (itemPath === '/characters' && location.pathname === '/') return true;
    return navLinkIsActive;
  };

  return (
    <nav className="bg-sci-panel border-b-4 border-sci-frame shadow-2xl z-50 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-24 transition-all duration-300">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 md:space-x-1">
              <PortalIcon className="w-10 h-10 md:w-16 md:h-16 text-sci-accent drop-shadow-[0_0_5px_rgba(88,166,255,0.8)] transition-all duration-300" />
              <div className="flex flex-col justify-center mt-0.5 md:mt-1">
                <span className="font-display font-black text-lg md:text-2xl text-sci-accent tracking-wider leading-none text-glow transition-all duration-300">
                  INTERDIMENSIONAL CODEX
                </span>
                <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-sci-text mt-0.5 md:mt-1 transition-all duration-300">
                  classified database
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav - High Visibility 3D Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="group relative bg-transparent p-0 border-none cursor-pointer outline-none focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {({ isActive }) => {
                  const active = getIsActive(item.path, isActive);
                  return (
                  <div className="relative">
                    {/* Shadow Layer */}
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg bg-black/60 blur-[6px] transition-transform duration-300 ${
                      active 
                        ? 'translate-y-[2px]' 
                        : 'translate-y-[6px]'
                    }`} />
                    
                    {/* Edge Layer (Depth) */}
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg transition-colors duration-200 ${
                      active 
                        ? 'bg-[#1a4c7a]' // Deep blue depth
                        : 'bg-[#1f242b]' // Dark grey depth
                    }`} />
                    
                    {/* Front Layer (Face) */}
                    <span className={`relative block rounded-lg px-6 py-3 font-display text-sm tracking-widest uppercase transition-all duration-300 ease-out flex items-center justify-center border-t border-white/20 ${
                      active
                        ? 'bg-sci-accent text-sci-base font-black shadow-[0_0_12px_rgba(88,166,255,0.3)] -translate-y-[2px]'
                        : 'bg-sci-frame text-gray-400 -translate-y-[6px]'
                    }`}>
                      <span className={`mr-2.5 transition-colors duration-300 ${
                        active ? 'text-sci-base' : 'text-sci-accent'
                      }`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, { 
                          strokeWidth: active ? 3 : 2.5,
                          className: "w-4 h-4"
                        })}
                      </span>
                      {item.name}
                    </span>
                  </div>
                )}}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative bg-transparent p-0 border-none cursor-pointer outline-none w-10 h-10"
              aria-label="Toggle menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className={`absolute top-0 left-0 w-full h-full rounded-lg bg-black/60 blur-[4px] transition-transform duration-300 ${
                  isOpen ? 'translate-y-[2px]' : 'translate-y-[4px]'
              }`} />
              <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-[#1f242b]" />
              <span className={`relative block w-full h-full rounded-lg border-t border-white/10 flex items-center justify-center transition-all duration-300 ${
                  isOpen 
                    ? 'bg-sci-frameLight text-white shadow-[0_0_8px_rgba(88,166,255,0.25)] -translate-y-[2px]' 
                    : 'bg-sci-frame text-sci-accent -translate-y-[4px]'
              }`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {isOpen && (
        <div className="md:hidden bg-sci-panel border-b-2 border-sci-frame animate-scanline shadow-2xl relative z-40">
           <div className="absolute inset-0 bg-sci-base/90 backdrop-blur-sm -z-10"></div>
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="group relative block bg-transparent p-0 border-none cursor-pointer outline-none w-full"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {({ isActive }) => {
                  const active = getIsActive(item.path, isActive);
                  return (
                  <div className="h-12 w-full relative">
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 blur-[2px] transition-transform duration-300 ${
                        active ? 'translate-y-[1px]' : 'translate-y-[3px]'
                    }`} />
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg transition-colors duration-200 ${
                        active 
                          ? 'bg-[#1a4c7a]' 
                          : 'bg-[#1f242b]'
                    }`} />
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg px-4 flex items-center font-display font-bold uppercase tracking-widest transition-all border-t border-white/10 ${
                        active
                          ? 'bg-sci-accent text-sci-base shadow-[0_0_8px_rgba(88,166,255,0.25)] -translate-y-[1px]'
                          : 'bg-sci-frame text-gray-400 -translate-y-[3px]'
                    }`}>
                       <span className={`mr-4 ${active ? 'text-sci-base' : 'text-sci-accent'}`}>
                        {item.icon}
                       </span> 
                       {item.name}
                    </span>
                  </div>
                )}}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;