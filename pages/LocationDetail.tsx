import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Location, Character } from '../types';
import { DetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Heart, Globe, Users } from 'lucide-react';
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
        // Limit to first 20 residents for performance in this view if there are many
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

  if (loading) return <DetailSkeleton />;
  if (error || !location) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;

  const favorited = isFavorite(location.id, 'location');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Link to="/locations" className="inline-flex items-center text-rm-green hover:text-rm-neon mb-6 transition-colors font-display tracking-wide text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Locations
      </Link>

      <div className="mb-8 p-8 bg-gradient-to-r from-black/80 to-rm-dark/80 border border-rm-green/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-rm-green/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">{location.name}</h1>
            <div className="flex space-x-6 text-lg text-gray-300">
               <span className="flex items-center"><Globe className="w-5 h-5 mr-2 text-rm-neon" /> {location.type}</span>
               <span className="text-gray-600">|</span>
               <span className="text-rm-teal">{location.dimension}</span>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite({ 
              id: location.id, 
              name: location.name, 
              type: 'location', 
              info: `${location.type} • ${location.dimension}` 
            })}
            className="p-3 rounded-full bg-white/5 hover:bg-rm-neon hover:text-black transition-all border border-white/10"
          >
            <Heart className={`w-6 h-6 ${favorited ? 'fill-red-500 text-red-500 hover:text-black' : 'text-gray-300'}`} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <Users className="w-6 h-6 mr-3 text-rm-neon" />
        <h2 className="text-2xl font-display font-bold">Residents {location.residents.length > 20 && <span className="text-sm font-sans font-normal text-gray-500">(Showing first 20)</span>}</h2>
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
              status={char.status}
            />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center border border-dashed border-gray-700 rounded-xl text-gray-500">
          No residents found on this plane of existence.
        </div>
      )}
    </div>
  );
};

export default LocationDetail;