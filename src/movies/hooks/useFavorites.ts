import { useCallback, useEffect, useState } from "react";
import { MovieDetail } from '../models/movieDetail';

export const useFavorites = (movie: MovieDetail) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const getLocalFavorites = localStorage.getItem('favorites');
      const storedFavorites: MovieDetail[] = getLocalFavorites ? JSON.parse(getLocalFavorites) : [];
      setIsFavorite(storedFavorites.some(favorite => favorite.id === movie.id))
    } catch (error) {
      setIsFavorite(false);
    }

  }, [movie?.id])

  const toggleFavorite = useCallback(() => {
    try {
      const getLocalFavorites = localStorage.getItem('favorites');
      const storedFavorites: MovieDetail[] = getLocalFavorites ? JSON.parse(getLocalFavorites) : [];
      const next = isFavorite ? storedFavorites.filter(m => m.id !== movie.id) : [...storedFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(next));
      setIsFavorite(!isFavorite);
    } catch {
      console.error('Error storage')
    }
  }, [isFavorite, movie]);

  return { isFavorite, toggleFavorite }
}
