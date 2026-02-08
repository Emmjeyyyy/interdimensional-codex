import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart, Terminal, Map, Radio } from 'lucide-react';
import { PortalIcon } from './PortalIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Subjects', path: '/characters', icon: <Terminal className="w-4 h-4 mr-2" /> },
    { name: 'Sectors', path: '/locations', icon: <Map className="w-4 h-4 mr-2" /> },
    { name: 'Logs', path: '/episodes', icon: <Radio className="w-4 h-4 mr-2" /> },
    { name: 'Saved', path: '/favorites', icon: <Heart className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="bg-sci-panel border-b-4 border-sci-frame shadow-2xl z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-stretch h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-4 group">
              <div className="relative w-12 h-12 bg-sci-screen border-2 border-sci-frame rounded flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-sci-accent/10 scanlines"></div>
                 <PortalIcon className="w-8 h-8 text-sci-accent group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg md:text-xl text-sci-accent tracking-wider leading-none text-glow">
                  INTERDIMENSIONAL CODEX
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-sci-text">
                  Classified Database
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav - 3D Pushable Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="group relative bg-transparent p-0 border-none cursor-pointer outline-none focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {({ isActive }) => (
                  <>
                    {/* Shadow Layer */}
                    <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 blur-[2px] transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px] motion-reduce:transition-none motion-reduce:transform-none will-change-transform" />
                    
                    {/* Edge Layer (Depth) */}
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#1c4e80] via-[#2a6eb0] to-[#1c4e80]' 
                        : 'bg-gradient-to-r from-[#1c2128] via-[#30363d] to-[#1c2128]'
                    }`} />
                    
                    {/* Front Layer (Face) */}
                    <span className={`relative block rounded-lg px-6 py-2 font-display text-sm tracking-wider uppercase transform -translate-y-[4px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-[6px] group-active:-translate-y-[2px] motion-reduce:transform-none flex items-center justify-center border-t border-white/10 ${
                      isActive
                        ? 'bg-sci-accent text-sci-base font-bold shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]'
                        : 'bg-sci-panel text-sci-text group-hover:brightness-110'
                    }`}>
                      {item.icon}
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button - 3D Style */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative bg-transparent p-0 border-none cursor-pointer outline-none w-12 h-12"
              aria-label="Toggle menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 blur-[2px] transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px] motion-reduce:transition-none motion-reduce:transform-none" />
              <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-r from-[#1c2128] via-[#30363d] to-[#1c2128]" />
              <span className="relative block w-full h-full rounded-lg bg-sci-panel text-sci-accent border-t border-white/10 flex items-center justify-center transform -translate-y-[4px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-[6px] group-active:-translate-y-[2px] motion-reduce:transform-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {isOpen && (
        <div className="md:hidden bg-sci-panel border-b-2 border-sci-frame animate-scanline">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="group relative block bg-transparent p-0 border-none cursor-pointer outline-none w-full"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {({ isActive }) => (
                  <div className="h-12 w-full relative">
                    <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 blur-[1px] translate-y-[2px]" />
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#1c4e80] via-[#2a6eb0] to-[#1c4e80]' 
                          : 'bg-gradient-to-r from-[#1c2128] via-[#30363d] to-[#1c2128]'
                    }`} />
                    <span className={`absolute top-0 left-0 w-full h-full rounded-lg px-4 flex items-center font-bold uppercase tracking-wider transform -translate-y-[4px] active:-translate-y-[2px] transition-transform border-t border-white/10 ${
                        isActive
                          ? 'bg-sci-accent text-sci-base'
                          : 'bg-sci-panel text-sci-text'
                    }`}>
                       {item.icon} {item.name}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;