import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { PortalIcon } from './PortalIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Characters', path: '/characters' },
    { name: 'Locations', path: '/locations' },
    { name: 'Episodes', path: '/episodes' },
    { name: 'Favorites', path: '/favorites', icon: <Heart className="w-4 h-4 mr-1 inline" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-rm-green/50 shadow-[0_0_15px_rgba(0,140,20,0.5)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <PortalIcon className="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(20,240,60,0.8)] transition-all duration-300" />
            <span className="font-display font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rm-neon to-rm-teal drop-shadow-[0_0_5px_rgba(20,240,60,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(20,240,60,1)] transition-all duration-300">
              INTERDIMENSIONAL CODEX
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-display text-sm tracking-widest uppercase transition-all duration-300 flex items-center ${
                    isActive
                      ? 'text-rm-neon drop-shadow-[0_0_8px_rgba(20,240,60,0.8)] border-b-2 border-rm-neon'
                      : 'text-gray-300 hover:text-rm-teal hover:drop-shadow-[0_0_5px_rgba(20,220,60,0.5)]'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-rm-neon hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-rm-dark border-t border-rm-green/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-display font-medium uppercase tracking-wider ${
                    isActive
                      ? 'text-rm-dark bg-rm-neon shadow-[0_0_10px_rgba(20,240,60,0.6)]'
                      : 'text-gray-300 hover:text-rm-neon hover:bg-black/50'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;