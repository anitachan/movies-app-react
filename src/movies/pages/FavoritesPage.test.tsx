import { render } from '@testing-library/react';
import { fixtureOf } from 'ts-mock-autofixture-kit';
import { Dashboard } from '../components/Dashboard';
import { MovieDetail } from '../models/movieDetail';
import { FavoritesPage } from './FavoritesPage';

const mockUseNavigate = jest.fn();
jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockUseNavigate,
  }),
  { virtual: true }
);
const mockMovies = fixtureOf<MovieDetail[]>({ seed: 42 }).create();

jest.mock('../hooks/useFavorites', () => ({
  useFavorites: () => ({ favorites: mockMovies }),
}));

jest.mock('../components/Dashboard', () => ({
  __esModule: true,
  Dashboard: jest.fn(() => <div data-testid="mock-dashboard">Dashboard Mock</div>),
}));

describe('FavoritesPage', () => {
  test('should render Favorite Page', () => {
    const { container } = render(<FavoritesPage />);

    expect(container).toMatchSnapshot();
    expect(Dashboard).toHaveBeenCalledWith(
      expect.objectContaining({ movies: mockMovies }),
      undefined
    );
  });
});
