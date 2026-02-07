import React from 'react';
import { Search } from 'lucide-react';

interface CharacterFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
}

export const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  search, setSearch, status, setStatus, gender, setGender
}) => (
  <div className="bg-black/40 backdrop-blur-sm border border-rm-green/30 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 shadow-lg">
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-green w-5 h-5" />
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-black/50 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-rm-neon focus:ring-1 focus:ring-rm-neon transition-all"
      />
    </div>
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="bg-black/50 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-rm-neon"
    >
      <option value="">All Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="bg-black/50 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-rm-neon"
    >
      <option value="">All Genders</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
      <option value="genderless">Genderless</option>
      <option value="unknown">Unknown</option>
    </select>
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rm-green w-5 h-5" />
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