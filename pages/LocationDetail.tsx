import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Location, Character } from '../types';
import { LocationEpisodeDetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Crosshair, Globe, Users, Radar } from 'lucide-react';
import Card from '../components/Card';

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const locData = await api.getLocationById(Number(id));
      setLocation(locData);

      const residentIds = locData.residents.map(url => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1]);
      });

      if (residentIds.length > 0) {
        const idsToFetch = residentIds.slice(0, 20); 
        const charsData = await api.getMultipleCharacters(idsToFetch);
        setResidents(charsData);
      }
    } catch (err) {
      setError("Failed to load location details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LocationEpisodeDetailSkeleton />;
  if (error || !location) return <div className="text-center py-20 text-sci-danger text-xl font-mono uppercase">{error}</div>;

  const favorited = isFavorite(location.id, 'location');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <Link to="/locations" className="inline-flex items-center text-sci-text hover:text-sci-accent mb-6 transition-colors font-mono tracking-wide text-xs uppercase group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Sector Map
      </Link>

      <div className="bg-sci-panel border-2 border-sci-frame rounded-sm shadow-xl overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-sci-frame border-b border-sci-frameLight px-6 py-3 flex justify-between items-center">
             <div className="font-mono text-xs text-sci-text uppercase tracking-[0.2em]">Sector Data: {location.name}</div>
             <div className="flex gap-2 text-sci-text font-mono text-xs">
                 COORD: {location.dimension === 'unknown' ? 'ERR-404' : location.dimension}
             </div>
        </div>

        <div className="p-8 relative">
            <div className="absolute right-10 top-10 opacity-10">
                <Globe className="w-40 h-40 text-sci-accent animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold text-sci-accent mb-2 uppercase text-glow">{location.name}</h1>
                    <div className="flex flex-col gap-2 mt-4 font-mono text-sm text-sci-text uppercase">
                        <div className="flex items-center">
                            <span className="w-32 text-sci-frameLight">Type:</span>
                            <span className="text-white">{location.type}</span>
                        </div>
                         <div className="flex items-center">
                            <span className="w-32 text-sci-frameLight">Dimension:</span>
                            <span className="text-white">{location.dimension}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => toggleFavorite({ 
                    id: location.id, 
                    name: location.name, 
                    type: 'location', 
                    info: `${location.type} • ${location.dimension}` 
                    })}
                    className={`flex items-center px-4 py-2 border font-mono uppercase text-sm bevel-btn transition-all ${
                        favorited 
                        ? 'bg-sci-danger/20 border-sci-danger text-sci-danger' 
                        : 'bg-sci-base border-sci-frame text-sci-text hover:text-white hover:border-sci-accent'
                    }`}
                >
                    <Crosshair className={`w-4 h-4 mr-2`} />
                    {favorited ? 'Sector Marked' : 'Mark Sector'}
                </button>
            </div>
        </div>
      </div>

      <div className="flex items-center mb-6 border-b border-sci-frame pb-2">
        <Users className="w-6 h-6 mr-3 text-sci-accent" />
        <h2 className="text-2xl font-display font-bold text-sci-text uppercase tracking-widest">Inhabitants</h2>
        {location.residents.length > 20 && <span className="ml-4 font-mono text-xs text-sci-frameLight">(DATA STREAM TRUNCATED)</span>}
      </div>

      {residents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {residents.map((char) => (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              type="character"
              image={char.image}
              subtitle={char.species}
            />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center border-2 border-dashed border-sci-frame rounded-sm">
            <Radar className="w-12 h-12 text-sci-frameLight mx-auto mb-4" />
            <p className="font-mono text-sci-text uppercase">Scan complete. No biological signatures detected.</p>
        </div>
      )}
    </div>
  );
};

export default LocationDetail;