import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Character, Episode } from '../types';
import { CharacterDetailSkeleton } from '../components/Loading';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, Crosshair, MapPin, Tv, Zap, Eye, EyeOff, Activity, Users, ShieldAlert } from 'lucide-react';
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

      const episodeIds = charData.episode.map(url => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1]);
      });

      if (episodeIds.length > 0) {
        const episodesData = await api.getMultipleEpisodes(episodeIds);
        setEpisodes(episodesData);
      }

      try {
        const versionsData = await api.getCharacters({
          name: charData.name,
          page: 1,
          status: '',
          species: '',
          gender: ''
        });
        const otherVersions = versionsData.results.filter(c => c.id !== charData.id);
        setVersions(otherVersions);
      } catch (vErr) {
        setVersions([]);
      }

    } catch (err) {
      setError("Failed to load character details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CharacterDetailSkeleton />;
  if (error || !character) return <div className="text-center py-20 text-sci-danger font-mono text-xl border border-sci-danger/50 bg-sci-danger/10 p-4 mx-4">{error}</div>;

  const favorited = isFavorite(character.id, 'character');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Link to="/characters" className="inline-flex items-center text-sci-text hover:text-sci-accent mb-6 transition-colors font-mono tracking-wide text-xs uppercase group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Database
      </Link>

      {/* Main Dossier Container */}
      <div className="bg-sci-panel border-2 border-sci-frame rounded-sm overflow-hidden shadow-2xl relative">
        {/* Top Secret Stamp */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 opacity-20 rotate-12 border-2 md:border-4 border-sci-danger text-sci-danger p-1 md:p-2 font-black text-xl md:text-4xl uppercase tracking-widest pointer-events-none select-none hidden sm:block">
            Classified
        </div>

        {/* Header Bar */}
        <div className="bg-sci-frame border-b border-sci-frameLight px-4 py-2 md:px-6 md:py-3 flex justify-between items-center">
             <div className="font-mono text-[0.6rem] md:text-xs text-sci-text uppercase tracking-[0.2em]">Subject Dossier #{character.id}</div>
        </div>

        <div className="p-5 md:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Left Col: Visuals */}
          <div className="lg:w-1/3 flex flex-col">
             {/* CRT Image Container */}
             <div className="bg-sci-base p-2 md:p-4 border-2 border-sci-frame shadow-crt-inset mb-6 relative">
               <div className="relative overflow-hidden border border-sci-frameLight/30">
                 <div className="absolute inset-0 z-20 pointer-events-none scanlines opacity-40"></div>
                 <img 
                   src={character.image} 
                   alt={character.name} 
                   className="w-full h-auto object-cover filter contrast-125 sepia-[0.2]"
                 />
                 <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 border-t border-sci-accent/30">
                    <p className="text-center text-xs font-mono text-sci-accent uppercase animate-pulse">Live Feed</p>
                 </div>
               </div>
             </div>

             <button
               onClick={() => toggleFavorite({ 
                 id: character.id, 
                 name: character.name, 
                 type: 'character', 
                 image: character.image, 
                 info: `${character.species} - ${character.gender}` 
               })}
               className={`w-full py-3 flex items-center justify-center border font-mono uppercase tracking-wider text-sm transition-all bevel-btn active:translate-y-px ${
                 favorited 
                   ? 'bg-sci-danger/20 border-sci-danger text-sci-danger' 
                   : 'bg-sci-frame border-sci-frameLight text-sci-text hover:text-sci-danger hover:border-sci-danger'
               }`}
             >
               <Crosshair className={`w-4 h-4 mr-2`} />
               {favorited ? 'Subject Tracked' : 'Track Subject'}
             </button>
          </div>

          {/* Right Col: Data */}
          <div className="lg:w-2/3">
             <h1 className="text-3xl md:text-5xl font-display font-bold text-sci-accent mb-2 uppercase tracking-tight text-glow break-words">
               {character.name}
             </h1>
             <div className="h-px w-full bg-gradient-to-r from-sci-accent to-transparent mb-8 opacity-50"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
                
                {/* Status Module */}
                <div className="bg-sci-base border border-sci-frame p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1">
                        <Activity className="w-4 h-4 text-sci-frameLight" />
                    </div>
                    <span className="block text-[0.6rem] text-sci-frameLight uppercase tracking-widest mb-2 font-mono">Vital Signs</span>
                    <button
                      onClick={() => setShowStatus(!showStatus)}
                      className="w-full text-left focus:outline-none group"
                    >
                      <div className="flex items-center justify-between">
                         <span className={`text-xl font-mono uppercase ${
                            showStatus 
                              ? (character.status === 'Alive' ? 'text-sci-success text-glow-green' : character.status === 'Dead' ? 'text-sci-danger' : 'text-sci-text')
                              : 'text-sci-text/50 blur-sm group-hover:blur-none transition-all'
                         }`}>
                           {showStatus ? character.status : '[REDACTED]'}
                         </span>
                         {showStatus ? <EyeOff size={16} className="text-sci-frameLight"/> : <Eye size={16} className="text-sci-accent animate-pulse"/>}
                      </div>
                    </button>
                </div>

                {/* Species Module */}
                <div className="bg-sci-base border border-sci-frame p-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[0.6rem] text-sci-frameLight uppercase tracking-widest font-mono">Biological Classification</span>
                        <Zap className="w-4 h-4 text-sci-frameLight" />
                    </div>
                    <div className="text-xl font-mono text-sci-text uppercase truncate">
                        {character.species} <span className="text-sm opacity-50">//{character.gender}</span>
                    </div>
                </div>

                {/* Origin Module */}
                <div className="bg-sci-base border border-sci-frame p-4 col-span-1 md:col-span-2">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-[0.6rem] text-sci-frameLight uppercase tracking-widest font-mono">Origin Point</span>
                        <MapPin className="w-4 h-4 text-sci-frameLight" />
                    </div>
                    {character.origin.url ? (
                        <Link to={`/locations/${character.origin.url.split('/').pop()}`} className="text-lg font-mono text-sci-accent hover:underline hover:text-white transition-colors uppercase flex items-center flex-wrap">
                        {character.origin.name} <span className="ml-2 text-xs border border-sci-accent px-1 rounded-sm">LINK</span>
                        </Link>
                    ) : (
                        <span className="text-lg font-mono text-sci-text uppercase">{character.origin.name}</span>
                    )}
                </div>
                 
                 {/* Location Module */}
                <div className="bg-sci-base border border-sci-frame p-4 col-span-1 md:col-span-2">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-[0.6rem] text-sci-frameLight uppercase tracking-widest font-mono">Last Known Coordinates</span>
                        <MapPin className="w-4 h-4 text-sci-frameLight" />
                    </div>
                    {character.location.url ? (
                        <Link to={`/locations/${character.location.url.split('/').pop()}`} className="text-lg font-mono text-sci-accent hover:underline hover:text-white transition-colors uppercase flex items-center flex-wrap">
                        {character.location.name} <span className="ml-2 text-xs border border-sci-accent px-1 rounded-sm">LINK</span>
                        </Link>
                    ) : (
                        <span className="text-lg font-mono text-sci-text uppercase">{character.location.name}</span>
                    )}
                </div>
             </div>

             {/* Episodes Log */}
             <div className="border-t border-sci-frame pt-6">
                <div className="flex items-center mb-4 text-sci-text">
                  <Tv className="w-5 h-5 mr-2" />
                  <h2 className="text-lg font-display font-bold uppercase tracking-wider">Appearance Log ({character.episode.length})</h2>
                </div>
                <div className="h-48 overflow-y-auto bg-sci-base border border-sci-frame p-2 custom-scrollbar">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {episodes.map(ep => (
                      <Link 
                        key={ep.id} 
                        to={`/episodes/${ep.id}`}
                        className="flex items-center p-2 hover:bg-sci-frame/50 transition-colors group"
                      >
                        <span className="font-mono text-sci-accent text-xs mr-2 border-r border-sci-frameLight pr-2 group-hover:text-white">{ep.episode}</span>
                        <span className="text-xs text-sci-text font-mono truncate uppercase group-hover:text-white">{ep.name}</span>
                      </Link>
                    ))}
                   </div>
                </div>
             </div>

          </div>
        </div>
        
        {/* Decorative Bottom Bar */}
        <div className="bg-sci-panel p-2 flex justify-between border-t border-sci-frame">
           <div className="text-[10px] text-sci-frameLight font-mono">SECURE CONNECTION ESTABLISHED</div>
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-1 bg-sci-frameLight/30"></div>
              ))}
           </div>
        </div>
      </div>

      {/* Alternate Versions */}
      {versions.length > 0 && (
        <div className="mt-12">
            <div className="flex items-center mb-6 text-sci-text border-b border-sci-frame pb-2">
                <Users className="w-5 h-5 md:w-6 md:h-6 mr-3 text-sci-accent" />
                <h2 className="text-lg md:text-xl font-display font-bold uppercase tracking-wider">Dimensional Variants Detected</h2>
                <div className="ml-auto px-2 py-1 bg-sci-alert/20 text-sci-alert text-xs font-mono border border-sci-alert uppercase flex items-center">
                    <ShieldAlert className="w-3 h-3 mr-1" />
                    {versions.length} Matches
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {versions.map(ver => (
                <Card 
                    key={ver.id}
                    id={ver.id}
                    name={ver.name}
                    type="character"
                    image={ver.image}
                    subtitle={`${ver.species} // ${ver.status}`}
                />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;