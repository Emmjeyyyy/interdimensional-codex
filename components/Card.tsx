import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

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

  return (
    <div className="group relative bg-black/60 border border-rm-green/40 rounded-xl overflow-hidden hover:border-rm-neon hover:shadow-[0_0_15px_rgba(20,240,60,0.3)] transition-all duration-300 flex flex-col h-full">
      <Link to={`/${type}s/${id}`} className="flex flex-col h-full">
        {image && (
          <div className="relative aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        )}

        <div className={`flex flex-col flex-grow ${image ? 'p-4' : 'p-5'}`}>
          {/* Title Container - Add padding right when no image to prevent overlap with absolute heart button */}
          <div className={`flex justify-between items-start mb-2 ${!image ? 'pr-10' : ''}`}>
            <h3 className="font-display font-bold text-lg text-white mb-1 truncate group-hover:text-rm-neon transition-colors w-full">
              {name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-400 font-medium mb-4 line-clamp-2">{subtitle}</p>
          
          <div className="mt-auto flex justify-between items-center">
            <span className="text-xs text-rm-teal uppercase tracking-widest font-bold group-hover:underline">
              Details &rarr;
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={handleFavoriteClick}
        className={`absolute rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-rm-neon hover:text-black transition-all duration-200 z-10 border border-white/10 ${
          image ? 'top-2 right-2 p-2' : 'top-4 right-4 p-2'
        }`}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500 hover:text-black' : ''}`}
        />
      </button>
    </div>
  );
};

export default Card;