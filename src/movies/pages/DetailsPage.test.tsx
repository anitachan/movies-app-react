import { render, screen } from '@testing-library/react';
import { DetailsPage } from './DetailsPage';
import { useMovie } from '../hooks/useMovie';
import { createList, fixtureOf } from 'ts-mock-autofixture-kit';
import { MovieDetail } from '../models/movieDetail';
import { Cast } from '../models/cast.model';
import { useFavorite } from '../hooks/useFavorite';

jest.mock('../hooks/useMovie', () => ({
  __esModule: true,
  useMovie: jest.fn(),
}));

jest.mock('../hooks/useFavorite', () => ({
  __esModule: true,
  useFavorite: jest.fn(),
}));

const mockUseNavigate = jest.fn();
jest.mock(
  'react-router-dom',
  () => ({
    useParams: () => ({ id: 'some-movie-id' }),
    useNavigate: () => mockUseNavigate,
  }),
  { virtual: true },
);

describe('DetailsPage', () => {
  const useActorMock = useMovie as jest.MockedFunction<typeof useMovie>;
  const useFavoriteMock = useFavorite as jest.MockedFunction<typeof useFavorite>;
  const mockActor = fixtureOf<MovieDetail>({ seed: 42 }).create();
  const mockCredits = createList<Cast>(3, { seed: 100 });

  beforeEach(async () => {
    useActorMock.mockReturnValue({
      movie: mockActor,
      cast: mockCredits,
      error: null,
      loading: false,
    });

    useFavoriteMock.mockReturnValue({
      isFavorite: false,
      toggleFavorite: jest.fn(),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render details page and favorite have to be with border icon', () => {
    const { container } = render(<DetailsPage />);

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('favorite-border-icon')).toBeInTheDocument();
  });

  test('should render details page and favorite have to be filled icon', () => {
    useFavoriteMock.mockReturnValueOnce({ isFavorite: true, toggleFavorite: jest.fn() });
    const { container } = render(<DetailsPage />);

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });
});
