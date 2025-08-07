import { Dashboard } from '../components/Dashboard';
import { useFavorites } from '../hooks/useFavorites';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return <Dashboard movies={favorites!} />;
};
