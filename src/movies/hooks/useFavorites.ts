import { useEffect, useState } from 'react';
import { MovieDetail } from '../models/movieDetail';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<MovieDetail[]>([]);
  useEffect(() => {
    try {
      const getLocalFavorites = localStorage.getItem('favorites');
      const storedFavorites: MovieDetail[] = getLocalFavorites ? JSON.parse(getLocalFavorites) : [];
      setFavorites(storedFavorites);
    } catch (error) {
      setFavorites([]);
    }
  }, []);

  return { favorites };
};
