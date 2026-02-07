import { APIResponse, Character, Location, Episode, CharacterFilter, LocationFilter, EpisodeFilter } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Simple in-memory cache to prevent redundant fetches within the same session
const cache = new Map<string, any>();

async function fetchWithCache<T>(url: string): Promise<T> {
  if (cache.has(url)) {
    return cache.get(url) as T;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  const data = await response.json();
  cache.set(url, data);
  return data;
}

function buildQueryString(params: any) {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
}

export const api = {
  getCharacters: async (filters: CharacterFilter): Promise<APIResponse<Character>> => {
    const url = `${BASE_URL}/character${buildQueryString(filters)}`;
    return fetchWithCache<APIResponse<Character>>(url);
  },
  getCharacterById: async (id: number): Promise<Character> => {
    return fetchWithCache<Character>(`${BASE_URL}/character/${id}`);
  },
  getMultipleCharacters: async (ids: number[]): Promise<Character[]> => {
    if (ids.length === 0) return [];
    const url = `${BASE_URL}/character/${ids.join(',')}`;
    // The API returns an object if only 1 ID is requested, array otherwise. Normalize it.
    const data = await fetchWithCache<Character | Character[]>(url);
    return Array.isArray(data) ? data : [data];
  },

  getLocations: async (filters: LocationFilter): Promise<APIResponse<Location>> => {
    const url = `${BASE_URL}/location${buildQueryString(filters)}`;
    return fetchWithCache<APIResponse<Location>>(url);
  },
  getLocationById: async (id: number): Promise<Location> => {
    return fetchWithCache<Location>(`${BASE_URL}/location/${id}`);
  },

  getEpisodes: async (filters: EpisodeFilter): Promise<APIResponse<Episode>> => {
    const url = `${BASE_URL}/episode${buildQueryString(filters)}`;
    return fetchWithCache<APIResponse<Episode>>(url);
  },
  getEpisodeById: async (id: number): Promise<Episode> => {
    return fetchWithCache<Episode>(`${BASE_URL}/episode/${id}`);
  },
  getMultipleEpisodes: async (ids: number[]): Promise<Episode[]> => {
    if (ids.length === 0) return [];
    const url = `${BASE_URL}/episode/${ids.join(',')}`;
    const data = await fetchWithCache<Episode | Episode[]>(url);
    return Array.isArray(data) ? data : [data];
  }
};