import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Character, Episode } from '../types';
import { DetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Heart, MapPin, Tv, Zap, Eye, EyeOff, Activity } from 'lucide-react';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const charData = await api.getCharacterById(Number(id));
      setCharacter(charData);

      // Extract episode IDs
      const episodeIds = charData.episode.map(url => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1]);
      });

      if (episodeIds.length > 0) {
        const episodesData = await api.getMultipleEpisodes(episodeIds);
        setEpisodes(episodesData);
      }
    } catch (err) {
      setError("Failed to load character details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DetailSkeleton />;
  if (error || !character) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;

  const favorited = isFavorite(character.id, 'character');

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Link to="/characters" className="inline-flex items-center text-rm-green hover:text-rm-neon mb-6 transition-colors font-display tracking-wide text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Characters
      </Link>

      <div className="bg-black/60 border border-rm-green/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,140,20,0.1)]">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3 relative">
            <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
          </div>

          {/* Info Section */}
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-display font-bold text-white drop-shadow-md">{character.name}</h1>
              <button
                onClick={() => toggleFavorite({ 
                  id: character.id, 
                  name: character.name, 
                  type: 'character', 
                  image: character.image, 
                  info: `${character.species} - ${character.gender}` 
                })}
                className="p-3 rounded-full bg-white/5 hover:bg-rm-neon hover:text-black transition-all border border-white/10"
              >
                <Heart className={`w-6 h-6 ${favorited ? 'fill-red-500 text-red-500 hover:text-black' : 'text-gray-300'}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                
                <div className="flex items-center text-gray-300">
                  <Activity className="w-5 h-5 mr-3 text-rm-neon" />
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Status</span>
                    <button
                      onClick={() => setShowStatus(!showStatus)}
                      className="flex items-center space-x-2 focus:outline-none group mt-1"
                    >
                      <span className={`text-lg font-medium transition-colors ${
                        showStatus 
                          ? (character.status === 'Alive' ? 'text-rm-green' : character.status === 'Dead' ? 'text-red-500' : 'text-gray-400')
                          : 'text-white group-hover:text-rm-neon'
                      }`}>
                        {showStatus ? character.status : 'Reveal Status'}
                      </span>
                      {showStatus ? (
                        <EyeOff className="w-4 h-4 text-gray-500 ml-2" />
                      ) : (
                        <Eye className="w-4 h-4 text-rm-neon ml-2 animate-pulse" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <Zap className="w-5 h-5 mr-3 text-rm-neon" />
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Species & Gender</span>
                    <span className="text-lg font-medium">{character.species} ({character.gender})</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-rm-neon" />
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Origin</span>
                    {character.origin.url ? (
                      <Link to={`/locations/${character.origin.url.split('/').pop()}`} className="text-lg font-medium hover:text-rm-neon underline decoration-rm-green/50 decoration-1 hover:decoration-rm-neon">
                        {character.origin.name}
                      </Link>
                    ) : (
                      <span className="text-lg font-medium">{character.origin.name}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-rm-neon" />
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Last Known Location</span>
                    {character.location.url ? (
                      <Link to={`/locations/${character.location.url.split('/').pop()}`} className="text-lg font-medium hover:text-rm-neon underline decoration-rm-green/50 decoration-1 hover:decoration-rm-neon">
                        {character.location.name}
                      </Link>
                    ) : (
                      <span className="text-lg font-medium">{character.location.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <div className="flex items-center mb-4 text-white">
                <Tv className="w-5 h-5 mr-3 text-rm-neon" />
                <h2 className="text-xl font-display font-bold">Episodes ({character.episode.length})</h2>
              </div>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {episodes.map(ep => (
                  <Link 
                    key={ep.id} 
                    to={`/episodes/${ep.id}`}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm hover:border-rm-neon hover:text-rm-neon transition-colors"
                  >
                    <span className="font-bold text-gray-400 mr-1">{ep.episode}:</span> {ep.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;