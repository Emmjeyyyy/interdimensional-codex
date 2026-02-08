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
                <span className="font-display font-black text-xl text-sci-accent tracking-wider leading-none text-glow">
                  CODEX
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-sci-text">
                  Classified Database
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav - Physical Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `h-10 px-6 flex items-center justify-center font-display text-sm tracking-wider uppercase transition-all duration-100 bevel-box ${
                    isActive
                      ? 'bg-sci-accent/20 text-sci-accent border-sci-accent/50 shadow-glow'
                      : 'bg-sci-base text-gray-400 hover:bg-sci-frame hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-sci-frame text-sci-accent border-2 border-sci-frameLight rounded active:bg-sci-base"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {isOpen && (
        <div className="md:hidden bg-sci-panel border-b-2 border-sci-frame">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded text-sm font-bold uppercase tracking-wider border ${
                    isActive
                      ? 'bg-sci-accent/10 text-sci-accent border-sci-accent'
                      : 'bg-sci-base text-gray-400 border-sci-frame'
                  }`
                }
              >
                <span className="flex items-center">
                   {item.icon} {item.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;