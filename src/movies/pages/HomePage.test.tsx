import { render } from '@testing-library/react';
import { fixtureOf } from 'ts-mock-autofixture-kit';
import { Dashboard } from '../components/Dashboard';
import { Movie } from '../models/movies.model';
import { HomePage } from './HomePage';

const mockMovies = fixtureOf<Movie[]>({ seed: 42 }).create();
const mockLoad = jest.fn();

jest.mock('../hooks/useMovies', () => ({
  useMovies: () => ({ movies: mockMovies, loadMore: mockLoad }),
}));

jest.mock('../components/Dashboard', () => ({
  __esModule: true,
  Dashboard: jest.fn(() => <div data-testid="mock-dashboard">Dashboard Mock</div>),
}));

describe('HomePage', () => {
  test('should render dashboard', () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
    expect(Dashboard).toHaveBeenCalledWith(
      expect.objectContaining({ loadMore: mockLoad, movies: mockMovies }),
      undefined
    );
  });
});
