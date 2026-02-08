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
  const [species, setSpecies] = useState('');

  // Debounce search
  const [debouncedName, setDebouncedName] = useState(name);
  const [debouncedSpecies, setDebouncedSpecies] = useState(species);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
      setDebouncedSpecies(species);
      setPage(1); // Reset to page 1 on filter change
    }, 500);
    return () => clearTimeout(handler);
  }, [name, species]);

  useEffect(() => {
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedName, debouncedSpecies]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getCharacters({
        page,
        name: debouncedName,
        status: '',
        gender: '',
        species: debouncedSpecies
      });
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err: any) {
      setCharacters([]);
      setTotalPages(0);
      if (err.message.includes("404") || err.message.includes("Not Found")) {
        setError("DATA QUERY RETURNED NULL.");
      } else {
        setError("SYSTEM FAILURE: UNABLE TO RETRIEVE DATA.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-end mb-6 border-b border-sci-accent/30 pb-2">
        <h1 className="text-2xl md:text-4xl font-display font-bold text-sci-text uppercase tracking-widest">
          Subjects
        </h1>
        <span className="ml-4 font-mono text-sci-accent text-xs md:text-sm mb-1 md:mb-2 opacity-70">// BIOLOGICAL DATABASE</span>
      </div>
      
      <CharacterFilters 
        search={name} setSearch={setName}
        species={species} setSpecies={setSpecies}
      />

      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-sci-base border-2 border-dashed border-sci-danger/30 rounded-sm mx-4 md:mx-0">
          <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-sci-danger mb-4 opacity-80" />
          <p className="text-lg md:text-xl font-mono text-sci-danger uppercase tracking-widest text-center px-4">{error}</p>
          <button 
            onClick={() => { setName(''); setSpecies(''); }}
            className="mt-6 px-4 py-2 bg-sci-danger/10 text-sci-danger border border-sci-danger font-mono text-xs hover:bg-sci-danger hover:text-black transition-colors"
          >
            RESET SEARCH PARAMETERS
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
                subtitle={`${char.species} // ${char.gender}`}
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