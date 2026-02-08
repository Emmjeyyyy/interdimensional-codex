import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Location } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { SimpleSearch } from '../components/Filters';
import { TextListSkeleton } from '../components/Loading';
import { AlertCircle } from 'lucide-react';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
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
    fetchLocations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedName]);

  const fetchLocations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getLocations({
        page,
        name: debouncedName,
        type: '',
        dimension: ''
      });
      setLocations(data.results);
      setTotalPages(data.info.pages);
    } catch (err: any) {
      setLocations([]);
      setTotalPages(0);
      if (err.message.includes("404")) {
        setError("SECTOR NOT FOUND.");
      } else {
        setError("NAVIGATIONAL DATA CORRUPTED.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-end mb-6 border-b border-sci-accent/30 pb-2">
        <h1 className="text-2xl md:text-4xl font-display font-bold text-sci-text uppercase tracking-widest">
          Sectors
        </h1>
        <span className="ml-4 font-mono text-sci-accent text-xs md:text-sm mb-1 md:mb-2 opacity-70">// PLANETARY REGISTRY</span>
      </div>

      <SimpleSearch 
        search={name} 
        setSearch={setName} 
        placeholder="Search Coordinates..." 
      />

      {loading ? (
        <TextListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-sci-base border-2 border-dashed border-sci-danger/30 rounded-sm mx-4 md:mx-0">
          <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-sci-danger mb-4 opacity-80" />
          <p className="text-lg md:text-xl font-mono text-sci-danger uppercase tracking-widest text-center px-4">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <Card
                key={loc.id}
                id={loc.id}
                name={loc.name}
                type="location"
                subtitle={`${loc.type} // ${loc.dimension}`}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Locations;