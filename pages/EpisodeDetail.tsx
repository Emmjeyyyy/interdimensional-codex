import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Episode, Character } from '../types';
import { DetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Heart, Calendar, PlayCircle, Users } from 'lucide-react';
import Card from '../components/Card';

const EpisodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const epData = await api.getEpisodeById(Number(id));
      setEpisode(epData);

      const charIds = epData.characters.map(url => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1]);
      });

      if (charIds.length > 0) {
        const idsToFetch = charIds.slice(0, 20); // Limit initial load
        const charsData = await api.getMultipleCharacters(idsToFetch);
        setCharacters(charsData);
      }
    } catch (err) {
      setError("Failed to load episode details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DetailSkeleton />;
  if (error || !episode) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;

  const favorited = isFavorite(episode.id, 'episode');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Link to="/episodes" className="inline-flex items-center text-rm-green hover:text-rm-neon mb-6 transition-colors font-display tracking-wide text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Episodes
      </Link>

      <div className="mb-8 p-8 bg-gradient-to-r from-black/80 to-rm-dark/80 border border-rm-green/30 rounded-2xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rm-neon/10 blur-3xl rounded-full" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="inline-block px-2 py-1 mb-2 bg-rm-green/20 border border-rm-green text-rm-green text-xs font-bold rounded">
              {episode.episode}
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">{episode.name}</h1>
            <div className="flex items-center text-lg text-gray-300 mt-4">
               <Calendar className="w-5 h-5 mr-2 text-rm-teal" /> 
               <span>Aired on {episode.air_date}</span>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite({ 
              id: episode.id, 
              name: episode.name, 
              type: 'episode', 
              info: `${episode.episode} • ${episode.air_date}` 
            })}
            className="p-3 rounded-full bg-white/5 hover:bg-rm-neon hover:text-black transition-all border border-white/10"
          >
            <Heart className={`w-6 h-6 ${favorited ? 'fill-red-500 text-red-500 hover:text-black' : 'text-gray-300'}`} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <Users className="w-6 h-6 mr-3 text-rm-neon" />
        <h2 className="text-2xl font-display font-bold">Characters Appeared {episode.characters.length > 20 && <span className="text-sm font-sans font-normal text-gray-500">(Showing first 20)</span>}</h2>
      </div>

      {characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
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
          No records of bio-forms in this timeline segment.
        </div>
      )}
    </div>
  );
};

export default EpisodeDetail;