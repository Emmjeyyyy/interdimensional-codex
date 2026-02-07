export interface APIResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type FavoriteType = 'character' | 'location' | 'episode';

export interface FavoriteItem {
  id: number;
  type: FavoriteType;
  name: string;
  info: string; // Brief info (e.g., Species, Dimension, Episode Code)
  image?: string; // Only for characters
}

export interface CharacterFilter {
  name: string;
  status: string;
  species: string;
  gender: string;
  page: number;
}

export interface LocationFilter {
  name: string;
  type: string;
  dimension: string;
  page: number;
}

export interface EpisodeFilter {
  name: string;
  episode: string;
  page: number;
}