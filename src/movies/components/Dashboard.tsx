import { Box } from '@mui/material';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Movie } from '../models/movies';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

interface Props {
	movies: Movie[];
	loadMore: () => void;
}

export const Dashboard = ({ movies, loadMore }: Props) => {
	const loaderRef = useInfiniteScroll(loadMore);

	return (
		<>
			<Box
				sx={{
					display: 'grid',
					minHeight: '120vh',
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(3, 1fr)',
						lg: 'repeat(4, 1fr)',
					},
					gap: 2,
				}}
			>
				{movies.length > 0
					? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
					: [...Array(9)].map((_, i) => <MovieCardSkeleton key={i} />)}
			</Box>
			{movies.length > 0 && <div ref={loaderRef} data-testid="loader" style={{ height: '60px' }} />}
		</>
	);
};
