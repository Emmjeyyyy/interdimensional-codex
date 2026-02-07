import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Episode } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { SimpleSearch } from '../components/Filters';
import { ListSkeleton } from '../components/Loading';
import { AlertCircle } from 'lucide-react';

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState('');
  const [debouncedName, setDebouncedName] = useState(name);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [name]);

  useEffect(() => {
    fetchEpisodes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedName]);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getEpisodes({
        page,
        name: debouncedName,
        episode: ''
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

  return (
    <div>
      <h1 className="text-4xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rm-neon to-white">
        Episodes
      </h1>

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
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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