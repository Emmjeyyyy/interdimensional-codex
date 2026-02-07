import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Character, Episode } from '../types';
import { CharacterDetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Heart, MapPin, Tv, Zap, Eye, EyeOff, Activity, Users } from 'lucide-react';
import Card from '../components/Card';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [versions, setVersions] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    setVersions([]);
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

      // Fetch versions (characters with the same name)
      try {
        const versionsData = await api.getCharacters({
          name: charData.name,
          page: 1,
          status: '',
          species: '',
          gender: ''
        });
        // Filter out current character
        const otherVersions = versionsData.results.filter(c => c.id !== charData.id);
        setVersions(otherVersions);
      } catch (vErr) {
        // Versions fetch failed or no results (404), just ignore
        setVersions([]);
      }

    } catch (err) {
      setError("Failed to load character details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CharacterDetailSkeleton />;
  if (error || !character) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;

  const favorited = isFavorite(character.id, 'character');

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Link to="/characters" className="inline-flex items-center text-rm-green hover:text-rm-neon mb-6 transition-colors font-display tracking-wide text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Characters
      </Link>

      <div className="bg-black border border-rm-green/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,140,20,0.1)]">
        
        {/* Banner Section */}
        <div className="h-48 w-full bg-gradient-to-r from-rm-dark via-[#002400] to-rm-dark relative border-b border-rm-green/20">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rm-green/20 via-transparent to-transparent opacity-50"></div>
        </div>

        <div className="px-6 md:px-10 pb-10">
          {/* Avatar & Header - Negative margin to overlap banner */}
          <div className="flex flex-col items-center -mt-24 mb-10 relative z-10">
             <div className="p-1.5 rounded-full bg-gradient-to-br from-rm-neon via-rm-green to-rm-dark shadow-[0_0_25px_rgba(20,240,60,0.4)]">
               <img 
                 src={character.image} 
                 alt={character.name} 
                 className="w-48 h-48 rounded-full object-cover border-4 border-black bg-black"
               />
             </div>
             
             <div className="mt-6 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-4">
                  {character.name}
                </h1>
                
                <button
                  onClick={() => toggleFavorite({ 
                    id: character.id, 
                    name: character.name, 
                    type: 'character', 
                    image: character.image, 
                    info: `${character.species} - ${character.gender}` 
                  })}
                  className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/5 hover:bg-rm-neon hover:text-black transition-all border border-white/10 group"
                >
                  <Heart className={`w-5 h-5 mr-2 ${favorited ? 'fill-red-500 text-red-500 hover:text-black' : 'text-gray-300'}`} />
                  <span className="font-medium tracking-wide">{favorited ? 'Favorited' : 'Add to Favorites'}</span>
                </button>
             </div>
          </div>

          {/* Details Grid */}
          <div className="max-w-4xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                {/* Left Column */}
                <div className="space-y-6">
                   {/* Status */}
                   <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-rm-green/30 transition-colors">
                      <Activity className="w-8 h-8 mr-4 text-rm-neon flex-shrink-0" />
                      <div className="flex-grow">
                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Status</span>
                        <button
                          onClick={() => setShowStatus(!showStatus)}
                          className="flex items-center space-x-2 focus:outline-none group w-full"
                        >
                          <div className="flex-shrink-0 w-5 flex justify-center">
                            {showStatus ? (
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-rm-neon animate-pulse" />
                            )}
                          </div>
                          <span className={`text-lg font-medium transition-colors ${
                            showStatus 
                              ? (character.status === 'Alive' ? 'text-rm-green' : character.status === 'Dead' ? 'text-red-500' : 'text-gray-400')
                              : 'text-white group-hover:text-rm-neon'
                          }`}>
                            {showStatus ? character.status : 'Reveal Status'}
                          </span>
                        </button>
                      </div>
                   </div>

                   {/* Species */}
                   <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-rm-green/30 transition-colors">
                      <Zap className="w-8 h-8 mr-4 text-rm-neon flex-shrink-0" />
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Species & Gender</span>
                        <span className="text-lg font-medium text-white">{character.species} ({character.gender})</span>
                      </div>
                   </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                   {/* Origin */}
                   <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-rm-green/30 transition-colors">
                      <MapPin className="w-8 h-8 mr-4 text-rm-neon flex-shrink-0" />
                      <div>
                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Origin</span>
                        {character.origin.url ? (
                          <Link to={`/locations/${character.origin.url.split('/').pop()}`} className="text-lg font-medium text-white hover:text-rm-neon underline decoration-rm-green/50 decoration-1 hover:decoration-rm-neon">
                            {character.origin.name}
                          </Link>
                        ) : (
                          <span className="text-lg font-medium text-white">{character.origin.name}</span>
                        )}
                      </div>
                   </div>

                   {/* Location */}
                   <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-rm-green/30 transition-colors">
                      <MapPin className="w-8 h-8 mr-4 text-rm-neon flex-shrink-0" />
                      <div>
                         <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Last Known Location</span>
                         {character.location.url ? (
                           <Link to={`/locations/${character.location.url.split('/').pop()}`} className="text-lg font-medium text-white hover:text-rm-neon underline decoration-rm-green/50 decoration-1 hover:decoration-rm-neon">
                             {character.location.name}
                           </Link>
                         ) : (
                           <span className="text-lg font-medium text-white">{character.location.name}</span>
                         )}
                      </div>
                   </div>
                </div>
             </div>

             {/* Versions */}
             {versions.length > 0 && (
                <div className="border-t border-gray-800 pt-8 mb-10">
                   <div className="flex items-center mb-6 text-white">
                     <Users className="w-6 h-6 mr-3 text-rm-neon" />
                     <h2 className="text-2xl font-display font-bold">Versions ({versions.length})</h2>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {versions.map(ver => (
                        <Card 
                            key={ver.id}
                            id={ver.id}
                            name={ver.name}
                            type="character"
                            image={ver.image}
                            subtitle={`${ver.species} - ${ver.status}`}
                        />
                      ))}
                   </div>
                </div>
             )}

             {/* Episodes */}
             <div className="border-t border-gray-800 pt-8">
               <div className="flex items-center mb-6 text-white">
                 <Tv className="w-6 h-6 mr-3 text-rm-neon" />
                 <h2 className="text-2xl font-display font-bold">Episodes ({character.episode.length})</h2>
               </div>
               <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                 {episodes.map(ep => (
                   <Link 
                     key={ep.id} 
                     to={`/episodes/${ep.id}`}
                     className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm hover:border-rm-neon hover:text-rm-neon transition-colors"
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