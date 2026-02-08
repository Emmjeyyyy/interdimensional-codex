import React from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Activity } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { PlanetIcon } from './PlanetIcon';

interface CardProps {
  id: number;
  name: string;
  type: 'character' | 'location' | 'episode';
  image?: string;
  subtitle: string;
}

const Card: React.FC<CardProps> = ({ id, name, type, image, subtitle }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id, type);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ id, name, type, image, info: subtitle });
  };

  const isTextOnly = type === 'location' || type === 'episode';

  if (isTextOnly) {
    return (
      <div className="group relative bg-sci-frame p-1 rounded-sm shadow-xl hover:shadow-glow transition-shadow duration-300 h-full">
        <Link to={`/${type}s/${id}`} className="flex flex-col h-full bg-sci-panel border border-sci-frameLight relative p-5 hover:bg-sci-panel/80 transition-colors">
            
            {/* Corner Screws */}
            <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
            <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>

            {/* Header: ID & Favorite */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${favorited ? 'bg-sci-danger shadow-[0_0_5px_rgba(248,81,73,0.8)]' : 'bg-sci-success/50'}`}></div>
                    <span className="text-[0.6rem] uppercase text-sci-text tracking-widest font-mono">REC-{id.toString().padStart(4, '0')}</span>
                 </div>
                 
                 <button
                    onClick={handleFavoriteClick}
                    className={`p-1.5 border border-sci-text/30 bg-black/60 transition-colors ${
                    favorited ? 'text-sci-danger border-sci-danger' : 'text-sci-text hover:text-sci-danger hover:border-sci-danger'
                    }`}
                    aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                >
                    <Crosshair className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col justify-center text-center space-y-3">
                 {type === 'location' && (
                    <div className="flex justify-center">
                        <PlanetIcon className="w-[50px] h-[50px] text-sci-accent opacity-60" />
                    </div>
                 )}
                 <h3 className="font-display font-bold text-lg text-sci-accent uppercase group-hover:text-white transition-colors leading-tight break-words">
                    {name}
                 </h3>
                 <div className="flex justify-center">
                    <div className="w-8 h-px bg-sci-frameLight/50"></div>
                 </div>
                 <p className="text-xs text-sci-text font-mono uppercase tracking-tight line-clamp-2">
                    {subtitle}
                 </p>
            </div>
            
             {/* Decorative Footer */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sci-frameLight/10 overflow-hidden">
                <div className="h-full bg-sci-accent/40 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group relative bg-sci-frame p-1 pb-2 rounded-sm shadow-xl hover:shadow-glow transition-shadow duration-300">
      <Link to={`/${type}s/${id}`} className="flex flex-col h-full">
        
        {/* CRT Screen Container - Responsive Height */}
        <div className="relative bg-sci-screen border-4 border-sci-panel rounded-lg mb-2 overflow-hidden shadow-crt-inset h-48 sm:h-64 flex flex-col items-center justify-center transition-all">
          
          {/* Scanlines & Glare Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none scanlines opacity-50 mix-blend-overlay"></div>
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/5 to-transparent h-1/3 opacity-30"></div>
          
          {image ? (
            <div className="w-full h-full relative">
               <img
                src={image}
                alt={name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter sepia-[0.3] contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-sci-accent/20 mix-blend-color opacity-30 pointer-events-none"></div>
            </div>
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-sci-frameLight p-6 text-center">
                <Activity className="w-12 h-12 mb-2 opacity-20" />
                <span className="text-xs uppercase tracking-widest opacity-50">No Visual Data</span>
             </div>
          )}

          {/* Status Indicator inside screen */}
          <div className="absolute top-3 left-3 z-30 flex items-center space-x-2">
             <div className={`w-2 h-2 rounded-full ${favorited ? 'bg-sci-danger shadow-[0_0_8px_rgba(248,81,73,1)]' : 'bg-sci-success/50'}`}></div>
             <span className="text-[0.5rem] uppercase text-sci-text tracking-widest font-mono">REC-{id.toString().padStart(4, '0')}</span>
          </div>

          {/* Favorite Button (Hardware switch style) */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 z-30 p-1.5 border border-sci-text/30 bg-black/60 transition-colors ${
              favorited ? 'text-sci-danger border-sci-danger' : 'text-sci-text hover:text-sci-danger hover:border-sci-danger'
            }`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

        {/* Metal Plate Label */}
        <div className="bg-sci-panel border border-sci-frameLight p-3 mt-auto relative">
          {/* Screws */}
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-sci-frameLight/50"></div>

          <h3 className="font-display font-bold text-md text-sci-accent uppercase truncate text-center mb-1 group-hover:text-white transition-colors">
            {name}
          </h3>
          
          <div className="flex justify-center items-center border-t border-sci-frame pt-1 mt-1">
             <p className="text-xs text-sci-text font-mono uppercase tracking-tighter truncate max-w-full">
               {subtitle}
             </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;