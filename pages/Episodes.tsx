import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Episode } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { SimpleSearch } from '../components/Filters';
import { ListSkeleton } from '../components/Loading';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const SEASONS = [
  { code: 'S01', name: 'Season 1', desc: 'The beginning of the madness.' },
  { code: 'S02', name: 'Season 2', desc: 'Things get darker.' },
  { code: 'S03', name: 'Season 3', desc: 'Pickle Rick and more.' },
  { code: 'S04', name: 'Season 4', desc: 'Edge of Tomorty.' },
  { code: 'S05', name: 'Season 5', desc: 'Canonical lore.' },
  { code: 'S06', name: 'Season 6', desc: 'Paranormal Jacktivity.' },
];

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState('');
  const [debouncedName, setDebouncedName] = useState(name);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [name]);

  useEffect(() => {
    // If there's a search term or a selected season, fetch episodes
    if (debouncedName || selectedSeason) {
      fetchEpisodes();
    } else {
      // Reset to season view state
      setEpisodes([]);
      setLoading(false);
      setError('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedName, selectedSeason]);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getEpisodes({
        page,
        name: debouncedName,
        episode: debouncedName ? '' : (selectedSeason || '')
      });
      setEpisodes(data.results);
      setTotalPages(data.info.pages);
    } catch (err: any) {
      setEpisodes([]);
      setTotalPages(0);
      if (err.message.includes("404")) {
        setError("No episodes found.");
      } else {
        setError("Failed to load episodes.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonSelect = (code: string) => {
    setSelectedSeason(code);
    setPage(1);
    setName(''); // Clear search if selecting a season (though search hides seasons, good practice)
  };

  const handleBackToSeasons = () => {
    setSelectedSeason(null);
    setEpisodes([]);
    setPage(1);
    setError('');
  };

  const isSearchActive = !!debouncedName;
  const isSeasonView = !isSearchActive && !selectedSeason;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-display font-bold text-rm-neon">
          {selectedSeason && !isSearchActive ? SEASONS.find(s => s.code === selectedSeason)?.name : 'Episodes'}
        </h1>
        {selectedSeason && !isSearchActive && (
          <button 
            onClick={handleBackToSeasons}
            className="flex items-center text-rm-green hover:text-rm-neon transition-colors font-display text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seasons
          </button>
        )}
      </div>

      <SimpleSearch 
        search={name} 
        setSearch={setName} 
        placeholder="Search episodes by name..." 
      />

      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-black/40 border border-red-500/30 rounded-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-xl text-gray-300">{error}</p>
          {selectedSeason && !isSearchActive && (
            <button 
              onClick={handleBackToSeasons}
              className="mt-4 text-rm-neon hover:underline"
            >
              Return to Seasons
            </button>
          )}
        </div>
      ) : isSeasonView ? (
        // Season Cards Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {SEASONS.map((season) => (
            <button
              key={season.code}
              onClick={() => handleSeasonSelect(season.code)}
              className="group relative bg-black border border-rm-green/40 rounded-xl overflow-hidden hover:border-rm-neon hover:shadow-[0_0_20px_rgba(20,240,60,0.2)] transition-all duration-300 text-center p-8 flex flex-col items-center justify-center min-h-[200px]"
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-rm-neon transition-colors">
                  {season.name}
                </h3>
                <p className="text-gray-400 font-medium group-hover:text-gray-300">
                  {season.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        // Episodes List (Search Results or Selected Season)
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {episodes.map((ep) => (
              <Card
                key={ep.id}
                id={ep.id}
                name={ep.name}
                type="episode"
                subtitle={`${ep.episode} • ${ep.air_date}`}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Episodes;