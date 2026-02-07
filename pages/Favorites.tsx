import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import Card from '../components/Card';
import { Heart, Ghost } from 'lucide-react';
import { ListSkeleton } from '../components/Loading';

const Favorites: React.FC = () => {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) return (
    <div>
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          My Favorites
        </h1>
      </div>
      <ListSkeleton />
    </div>
  );

  const hasFavorites = 
    favorites.characters.length > 0 || 
    favorites.locations.length > 0 || 
    favorites.episodes.length > 0;

  return (
    <div>
       <div className="flex items-center mb-8">
        <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          My Favorites
        </h1>
        <Heart className="ml-4 text-red-500 fill-red-500 animate-pulse-slow w-8 h-8" />
       </div>

      {!hasFavorites ? (
        <div className="flex flex-col items-center justify-center py-20 bg-black/40 border border-gray-800 rounded-2xl">
          <Ghost className="w-20 h-20 text-gray-700 mb-6" />
          <h2 className="text-2xl font-display text-gray-400 mb-2">The Void is Empty</h2>
          <p className="text-gray-500">Add some characters, locations, or episodes to your collection.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {favorites.characters.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold text-rm-green mb-4 border-b border-rm-green/30 pb-2">Characters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.characters.map((char) => (
                  <Card
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    type="character"
                    image={char.image}
                    subtitle={char.info}
                  />
                ))}
              </div>
            </section>
          )}

          {favorites.locations.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold text-rm-green mb-4 border-b border-rm-green/30 pb-2">Locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.locations.map((loc) => (
                  <Card
                    key={loc.id}
                    id={loc.id}
                    name={loc.name}
                    type="location"
                    subtitle={loc.info}
                  />
                ))}
              </div>
            </section>
          )}

          {favorites.episodes.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold text-rm-green mb-4 border-b border-rm-green/30 pb-2">Episodes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.episodes.map((ep) => (
                  <Card
                    key={ep.id}
                    id={ep.id}
                    name={ep.name}
                    type="episode"
                    subtitle={ep.info}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;