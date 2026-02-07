import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Character } from '../types';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { CharacterFilters } from '../components/Filters';
import { ListSkeleton } from '../components/Loading';
import { AlertCircle } from 'lucide-react';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  // Debounce search
  const [debouncedName, setDebouncedName] = useState(name);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
      setPage(1); // Reset to page 1 on filter change
    }, 500);
    return () => clearTimeout(handler);
  }, [name, status, gender]);

  useEffect(() => {
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedName, status, gender]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getCharacters({
        page,
        name: debouncedName,
        status,
        gender,
        species: ''
      });
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err: any) {
      setCharacters([]);
      setTotalPages(0);
      if (err.message.includes("404")) {
        setError("No characters found matching your filters.");
      } else {
        setError("Failed to load characters. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rm-neon to-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Characters
      </h1>
      
      <CharacterFilters 
        search={name} setSearch={setName}
        status={status} setStatus={setStatus}
        gender={gender} setGender={setGender}
      />

      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-black/40 border border-red-500/30 rounded-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-xl text-gray-300">{error}</p>
          <button 
            onClick={() => { setName(''); setStatus(''); setGender(''); }}
            className="mt-4 text-rm-neon hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((char) => (
              <Card
                key={char.id}
                id={char.id}
                name={char.name}
                type="character"
                image={char.image}
                subtitle={`${char.species} - ${char.gender}`}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Characters;