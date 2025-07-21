import { Dashboard } from '../components/Dashboard';
import { useMovies } from '../hooks/useMovies';

export const HomePage = () => {
	const { movies, loadMore } = useMovies();

	return <Dashboard movies={movies} loadMore={loadMore} />;
};
