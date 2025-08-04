import { fireEvent, render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { Movie } from '../models/movies.model';
import { create, fixtureOf, logRaw } from 'ts-mock-autofixture-kit';

const mockUseNavigate = jest.fn();
const movieMock = create<Movie>();
jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockUseNavigate,
  }),
  { virtual: true },
);

describe('MovieCard', () => {
  test('MovieCard matches snapshot', () => {
    const movie = fixtureOf<Movie>({ seed: 42 }).create();

    const { container } = render(<MovieCard movie={movie} />);
    expect(container).toMatchSnapshot();
  });

  test('should render title, description, button and a image', () => {
    render(<MovieCard movie={movieMock} />);
    const images = screen.getAllByRole('img').filter((img) => img.hasAttribute('alt'));

    expect(screen.getByText(movieMock.title)).toBeInTheDocument();
    expect(screen.getByText(movieMock.overview)).toBeInTheDocument();
    expect(images).toHaveLength(1);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('should render "Ver más" button for each movie', () => {
    render(<MovieCard movie={movieMock} />);
    const buttons = screen.getAllByRole('button', { name: 'See More' });
    expect(buttons).toHaveLength(1);
  });

  test('should redirect when see more is clicked', () => {
    render(<MovieCard movie={movieMock} />);
    const button = screen.getByText('See More');
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledWith(`/details/${movieMock.id}`);
  });
});
