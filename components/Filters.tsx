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
  <div className="bg-black/40 backdrop-blur-sm border border-rm-green/30 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 shadow-lg">
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-green w-5 h-5 pointer-events-none" />
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-black/50 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-rm-neon focus:ring-1 focus:ring-rm-neon transition-all"
      />
    </div>
    <div className="relative md:w-64">
      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-green w-5 h-5 pointer-events-none" />
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="w-full bg-black/50 border border-gray-700 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:border-rm-neon focus:ring-1 focus:ring-rm-neon transition-all appearance-none cursor-pointer"
      >
        <option value="" className="bg-black text-white">All Species</option>
        {SPECIES_OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt === 'unknown' ? 'Unknown' : opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-rm-green w-4 h-4 pointer-events-none" />
    </div>
  </div>
);

interface SimpleSearchProps {
  search: string;
  setSearch: (v: string) => void;
  placeholder: string;
}

export const SimpleSearch: React.FC<SimpleSearchProps> = ({ search, setSearch, placeholder }) => (
  <div className="bg-black/40 backdrop-blur-sm border border-rm-green/30 p-4 rounded-xl mb-6 shadow-lg">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-green w-5 h-5 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-black/50 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-rm-neon focus:ring-1 focus:ring-rm-neon transition-all"
      />
    </div>
  </div>
);