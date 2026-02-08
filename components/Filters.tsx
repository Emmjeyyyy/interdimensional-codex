import React from 'react';
import { Search, Zap, ChevronDown } from 'lucide-react';

interface CharacterFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  species: string;
  setSpecies: (v: string) => void;
}

const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Poopybutthole',
  'Mythological Creature',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
  'unknown',
];

export const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  search, setSearch, species, setSpecies
}) => (
  <div className="bg-sci-panel border-2 border-sci-frame p-3 md:p-4 mb-6 md:mb-8 flex flex-col md:flex-row gap-3 md:gap-4 shadow-lg bevel-box">
    <div className="relative flex-grow group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sci-text w-4 h-4 md:w-5 md:h-5 group-focus-within:text-sci-accent transition-colors pointer-events-none" />
      <input
        type="text"
        placeholder="QUERY DATABASE..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-sci-screen border border-sci-frame text-sci-accent font-mono pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-sci-accent focus:shadow-glow transition-all placeholder:text-sci-frameLight uppercase"
      />
    </div>
    <div className="relative md:w-64 group">
      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-sci-text w-4 h-4 md:w-5 md:h-5 group-focus-within:text-sci-accent transition-colors pointer-events-none" />
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="w-full bg-sci-screen border border-sci-frame text-sci-accent font-mono pl-9 md:pl-10 pr-9 md:pr-10 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-sci-accent focus:shadow-glow transition-all appearance-none cursor-pointer uppercase"
      >
        <option value="" className="bg-sci-base">FILTER: ALL SPECIES</option>
        {SPECIES_OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-sci-base text-sci-text">
            {opt === 'unknown' ? 'UNKNOWN' : opt.toUpperCase()}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-sci-text w-4 h-4 pointer-events-none" />
    </div>
  </div>
);

interface SimpleSearchProps {
  search: string;
  setSearch: (v: string) => void;
  placeholder: string;
}

export const SimpleSearch: React.FC<SimpleSearchProps> = ({ search, setSearch, placeholder }) => (
  <div className="bg-sci-panel border-2 border-sci-frame p-3 md:p-4 mb-6 md:mb-8 bevel-box">
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sci-text w-4 h-4 md:w-5 md:h-5 group-focus-within:text-sci-accent pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder.toUpperCase()}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-sci-screen border border-sci-frame text-sci-accent font-mono pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-sci-accent focus:shadow-glow transition-all placeholder:text-sci-frameLight uppercase"
      />
    </div>
  </div>
);