import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Location } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { SimpleSearch } from '../components/Filters';
import { ListSkeleton } from '../components/Loading';
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
        setError("No locations found.");
      } else {
        setError("Failed to load locations.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rm-neon to-white">
        Locations
      </h1>

      <SimpleSearch 
        search={name} 
        setSearch={setName} 
        placeholder="Search locations..." 
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
            {locations.map((loc) => (
              <Card
                key={loc.id}
                id={loc.id}
                name={loc.name}
                type="location"
                subtitle={`${loc.type} • ${loc.dimension}`}
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