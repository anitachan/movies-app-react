import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { Movie, OriginalLanguage } from '../models/movies';
import { MovieCard as MockedMovieCard } from './MovieCard'; // 👈 cambio aquí

const mockMovies: Movie[] = [
	{
		adult: false,
		backdrop_path: '/t9nyF3r0WAlJ7Kr6xcRYI4jr9jm.jpg',
		genre_ids: [878, 28],
		id: 580489,
		original_language: OriginalLanguage.En,
		original_title: 'Venom: Let There Be Carnage',
		overview:
			'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
		popularity: 10352.991,
		poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
		release_date: '2021-09-30',
		title: 'Venom: Let There Be Carnage',
		video: false,
		vote_average: 7.2,
		vote_count: 518,
	},
	{
		adult: false,
		backdrop_path: '/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
		genre_ids: [35, 28, 12, 878],
		id: 550988,
		original_language: OriginalLanguage.En,
		original_title: 'Free Guy',
		overview:
			'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
		popularity: 5333.728,
		poster_path: '/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
		release_date: '2021-08-11',
		title: 'Free Guy',
		video: false,
		vote_average: 7.9,
		vote_count: 2611,
	},
	{
		adult: false,
		backdrop_path: '/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg',
		genre_ids: [28, 12],
		id: 568620,
		original_language: OriginalLanguage.En,
		original_title: 'Snake Eyes: G.I. Joe Origins',
		overview:
			"After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
		popularity: 3101.51,
		poster_path: '/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg',
		release_date: '2021-07-22',
		title: 'Snake Eyes: G.I. Joe Origins',
		video: false,
		vote_average: 6.9,
		vote_count: 635,
	},
];

const MovieCard = MockedMovieCard as jest.Mock;

jest.mock('../hooks/useInfiniteScroll', () => ({
	useInfiniteScroll: (cb: () => void) => {
		cb();
		return { current: null };
	},
}));
jest.mock('./MovieCard', () => ({
	__esModule: true,
	MovieCard: jest.fn(({ movie }) => <div data-testid={`movie-${movie.id}`} />),
}));

describe('Dashboard', () => {
	test('Dashboard matches snapshot', () => {
		const { container } = render(<Dashboard movies={mockMovies} loadMore={jest.fn()} />);
		expect(container).toMatchSnapshot();
	});

	test('should render dashboard', () => {
		render(<Dashboard movies={mockMovies} loadMore={jest.fn()} />);

		expect(MovieCard).toHaveBeenCalledTimes(3);

		expect(MovieCard.mock.calls[0][0]).toMatchObject({ movie: mockMovies[0] });

		expect(MovieCard.mock.calls[0][0]).toEqual(expect.objectContaining({ movie: mockMovies[0] }));
		expect(MovieCard.mock.calls[1][0]).toEqual(expect.objectContaining({ movie: mockMovies[1] }));
		expect(MovieCard.mock.calls[2][0]).toEqual(expect.objectContaining({ movie: mockMovies[2] }));
	});

	test('should render loader div if movies exist', () => {
		render(<Dashboard movies={mockMovies} loadMore={jest.fn()} />);

		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});

	test('should not render loader div if no movies', () => {
		render(<Dashboard movies={[]} loadMore={jest.fn()} />);

		expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
	});

	test('should call loadMore when loaderRef is triggered', () => {
		const loadMore = jest.fn();

		render(<Dashboard movies={mockMovies} loadMore={loadMore} />);

		expect(loadMore).toHaveBeenCalledTimes(1);
	});
});
