import { Box, Button, Rating, Stack, Typography } from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Movie } from '../models/Movies';

interface Props {
	movies: Movie[];
	loadMore: () => void;
}

export const Dashboard = ({ movies, loadMore }: Props) => {
	const loaderRef = useInfiniteScroll(loadMore);
	const url = process.env.REACT_APP_IMAGES_URL;

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
				{movies.map((item) => (
					<Box key={item.id} sx={{ position: 'relative' }}>
						<img
							src={`${url}${item.backdrop_path}?w=400&fit=crop&auto=format`}
							alt={item.title}
							loading="lazy"
							style={{
								width: '100%',
								height: 'auto',
								objectFit: 'cover',
								display: 'block',
								borderRadius: 4,
							}}
						/>
						<Box
							sx={{
								bgcolor: 'rgba(0, 0, 0, 0.7)',
								color: 'white',
								p: 2,
								mt: '-4px',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderBottomLeftRadius: 4,
								borderBottomRightRadius: 4,
							}}
						>
							<Box>
								<Typography variant="subtitle1" fontWeight="bold">
									{item.title}
								</Typography>
								<Typography variant="body2">{item.title}</Typography>
								<Stack direction="row" spacing={1} alignItems="center">
									<Rating value={item.vote_average} precision={0.1} max={10} readOnly />
									<Typography variant="body2">{item.vote_average.toPrecision(2)}</Typography>
								</Stack>
							</Box>
							<Button variant="contained" size="small" color="primary">
								Ver más
							</Button>
						</Box>
					</Box>
				))}
			</Box>

			{movies.length > 0 && <div ref={loaderRef} style={{ height: '60px' }} />}
		</>
	);
};
