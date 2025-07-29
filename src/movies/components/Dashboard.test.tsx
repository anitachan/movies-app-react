import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { Movie } from '../models/movies.model';
import { MovieCard as MockedMovieCard } from './MovieCard';
import { createList } from 'ts-mock-autofixture-kit';

const mockMovies = createList<Movie>(3);
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
