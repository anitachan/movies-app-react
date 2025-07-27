import { render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { Movie, OriginalLanguage } from '../models/movies';

const movie: Movie = {
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
};

describe('MovieCard', () => {
	test('MovieCard matches snapshot', () => {
		const { container } = render(<MovieCard movie={movie} />);
		expect(container).toMatchSnapshot();
	});

	test('should render title, description, button and a image', () => {
		render(<MovieCard movie={movie} />);
		const images = screen.getAllByRole('img').filter((img) => img.hasAttribute('alt'));

		expect(screen.getByText('Venom: Let There Be Carnage')).toBeInTheDocument();
		expect(
			screen.getByText(
				'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.'
			)
		).toBeInTheDocument();
		expect(images).toHaveLength(1);
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	test('should render "Ver más" button for each movie', () => {
		render(<MovieCard movie={movie} />);
		const buttons = screen.getAllByRole('button', { name: 'Ver más' });
		expect(buttons).toHaveLength(1);
	});
});
