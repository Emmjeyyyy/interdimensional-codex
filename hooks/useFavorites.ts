import { useState, useEffect, useCallback } from 'react';
import { FavoriteItem } from '../types';

const STORAGE_KEY = 'rm_wiki_favorites';

interface FavoritesState {
  characters: FavoriteItem[];
  locations: FavoriteItem[];
  episodes: FavoriteItem[];
}

const initialFavorites: FavoritesState = {
  characters: [],
  locations: [],
  episodes: []
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritesState>(initialFavorites);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse favorites from local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage whenever favorites change, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      const listKey = item.type === 'character' ? 'characters' : item.type === 'location' ? 'locations' : 'episodes';
      const list = prev[listKey];
      const exists = list.some(i => i.id === item.id);

      let newList;
      if (exists) {
        newList = list.filter(i => i.id !== item.id);
      } else {
        newList = [...list, item];
      }

      return {
        ...prev,
        [listKey]: newList
      };
    });
  }, []);

  const isFavorite = useCallback((id: number, type: 'character' | 'location' | 'episode') => {
    const listKey = type === 'character' ? 'characters' : type === 'location' ? 'locations' : 'episodes';
    return favorites[listKey].some(i => i.id === id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
};