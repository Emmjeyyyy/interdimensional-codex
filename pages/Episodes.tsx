import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Episode } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { SimpleSearch } from '../components/Filters';
import { TextListSkeleton } from '../components/Loading';
import { AlertCircle, ArrowLeft, Disc } from 'lucide-react';

const SEASONS = [
  { code: 'S01', name: 'SEASON 01', desc: 'INITIAL SEQUENCE' },
  { code: 'S02', name: 'SEASON 02', desc: 'EXPANSION PHASE' },
  { code: 'S03', name: 'SEASON 03', desc: 'ESCALATION' },
  { code: 'S04', name: 'SEASON 04', desc: 'DIVERGENCE' },
  { code: 'S05', name: 'SEASON 05', desc: 'CANONICAL EVENT' },
  { code: 'S06', name: 'SEASON 06', desc: 'PARANORMAL' },
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
    if (debouncedName || selectedSeason) {
      fetchEpisodes();
    } else {
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
        setError("NO RECORDS FOUND.");
      } else {
        setError("ARCHIVE ACCESS DENIED.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonSelect = (code: string) => {
    setSelectedSeason(code);
    setPage(1);
    setName('');
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
      <div className="flex items-center justify-between mb-6 border-b border-sci-accent/30 pb-2">
        <div className="flex items-end">
          <h1 className="text-4xl font-display font-bold text-sci-text uppercase tracking-widest">
            {selectedSeason && !isSearchActive ? SEASONS.find(s => s.code === selectedSeason)?.name : 'Mission Logs'}
          </h1>
          <span className="ml-4 font-mono text-sci-accent text-sm mb-2 opacity-70 hidden sm:inline">// ARCHIVAL FOOTAGE</span>
        </div>
        
        {selectedSeason && !isSearchActive && (
          <button 
            onClick={handleBackToSeasons}
            className="flex items-center text-sci-accent hover:text-white transition-colors font-mono text-xs uppercase border border-sci-accent px-3 py-1 bg-sci-accent/10"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Return to Index
          </button>
        )}
      </div>

      <SimpleSearch 
        search={name} 
        setSearch={setName} 
        placeholder="Search Mission Logs..." 
      />

      {loading ? (
        <TextListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-sci-base border-2 border-dashed border-sci-danger/30 rounded-sm">
          <AlertCircle className="w-12 h-12 text-sci-danger mb-4 opacity-80" />
          <p className="text-xl font-mono text-sci-danger uppercase tracking-widest">{error}</p>
          {selectedSeason && !isSearchActive && (
            <button 
              onClick={handleBackToSeasons}
              className="mt-4 text-sci-accent underline hover:text-white font-mono uppercase text-xs"
            >
              Return to Season Index
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
              className="group relative bg-sci-frame p-1 rounded-sm shadow-xl hover:shadow-glow transition-shadow duration-300 h-48"
            >
              <div className="bg-sci-panel h-full border-2 border-sci-frame flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sci-frameLight/10 to-transparent"></div>
                
                <Disc className="w-16 h-16 text-sci-frameLight/30 mb-2 group-hover:text-sci-accent/50 transition-colors animate-pulse duration-[3000ms]" />
                
                <h3 className="text-2xl font-display font-bold text-sci-text group-hover:text-white transition-colors uppercase tracking-wider relative z-10">
                  {season.name}
                </h3>
                <p className="text-sci-accent font-mono text-xs mt-1 opacity-70 group-hover:opacity-100">
                  [{season.desc}]
                </p>

                <div className="absolute bottom-2 right-2 text-[0.6rem] font-mono text-sci-frameLight">
                   DIR: {season.code}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        // Episodes List
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {episodes.map((ep) => (
              <Card
                key={ep.id}
                id={ep.id}
                name={ep.name}
                type="episode"
                subtitle={`${ep.episode} // ${ep.air_date}`}
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