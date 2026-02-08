import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import Card from '../components/Card';
import { Ghost, Database } from 'lucide-react';
import { ListSkeleton } from '../components/Loading';

const Favorites: React.FC = () => {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) return (
    <div>
      <div className="flex items-end mb-8 border-b border-sci-accent/30 pb-2">
        <h1 className="text-2xl md:text-4xl font-display font-bold text-sci-text uppercase tracking-widest">
          Saved Data
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
       <div className="flex items-end mb-8 border-b border-sci-accent/30 pb-2">
        <h1 className="text-2xl md:text-4xl font-display font-bold text-sci-text uppercase tracking-widest">
          Saved Data
        </h1>
        <span className="ml-4 font-mono text-sci-accent text-xs md:text-sm mb-1 md:mb-2 opacity-70">// LOCAL STORAGE</span>
       </div>

      {!hasFavorites ? (
        <div className="flex flex-col items-center justify-center py-20 bg-sci-base border-2 border-dashed border-sci-frame rounded-sm mx-4 md:mx-0">
          <Database className="w-16 h-16 md:w-20 md:h-20 text-sci-frameLight mb-6 opacity-50" />
          <h2 className="text-xl md:text-2xl font-mono text-sci-text mb-2 uppercase tracking-wider text-center px-4">Storage Empty</h2>
          <p className="text-sci-frameLight font-mono text-sm uppercase text-center px-4">Mark entities to retain data locally.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {favorites.characters.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-display font-bold text-sci-accent mb-4 border-l-4 border-sci-accent pl-3 uppercase tracking-wider">Subjects</h2>
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
              <h2 className="text-lg md:text-xl font-display font-bold text-sci-accent mb-4 border-l-4 border-sci-accent pl-3 uppercase tracking-wider">Sectors</h2>
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
              <h2 className="text-lg md:text-xl font-display font-bold text-sci-accent mb-4 border-l-4 border-sci-accent pl-3 uppercase tracking-wider">Logs</h2>
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