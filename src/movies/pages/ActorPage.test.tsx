import { fireEvent, render, screen } from '@testing-library/react';
import { createList, fixtureOf } from 'ts-mock-autofixture-kit';
import noUser from '../../assets/no-user.png';
import { useActor } from '../hooks/useActor';
import { Actor } from '../models/actor.model';
import { ActorCast } from '../models/actorCast.model';
import { ActorPage } from './ActorPage';

process.env.REACT_APP_IMAGES_URL ||= 'https://example.com/';

jest.mock('../hooks/useActor', () => ({
  __esModule: true,
  useActor: jest.fn(),
}));

jest.mock('../components/CreditsCard', () => ({
  __esModule: true,
  CreditsCard: ({ credit }: { credit: any }) => (
    <div data-testid="mock-credits-card">{credit?.character}</div>
  ),
}));

jest.mock(
  'react-router-dom',
  () => ({
    useParams: () => ({ id: 'some-actor-id' }),
  }),
  { virtual: true }
);

describe('ActorPage', () => {
  const useActorMock = useActor as jest.MockedFunction<typeof useActor>;
  const mockActor = fixtureOf<Actor>({ seed: 42 }).create();
  const mockCredits = createList<ActorCast>(3, { seed: 100 });
  beforeEach(async () => {
    useActorMock.mockReturnValue({
      actor: mockActor,
      credits: mockCredits,
      error: null,
      loading: false,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render actor and show credits', () => {
    const { container } = render(<ActorPage />);

    expect(container).toMatchSnapshot();

    const cards = screen.getAllByTestId('mock-credits-card');
    expect(cards).toHaveLength(3);
    expect(cards[0].textContent).toBe(mockCredits[0].character);
    expect(cards[1].textContent).toBe(mockCredits[1].character);
    expect(cards[2].textContent).toBe(mockCredits[2].character);
  });

  test('should set noUser when poster is empty', () => {
    const mockActorPoster = fixtureOf<Actor>()
      .with('profile_path', () => '')
      .with('name', () => 'No Poster Actor')
      .create();

    useActorMock.mockReturnValue({
      actor: mockActorPoster,
      credits: mockCredits,
      error: null,
      loading: false,
    });

    render(<ActorPage />);
    const image = screen.getByAltText('No Poster Actor') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(noUser);
  });

  test('should set no user when image has an error ', () => {
    render(<ActorPage />);
    const img = screen.getByAltText(mockActor.name) as HTMLImageElement;

    expect(img.src).toContain(mockActor.profile_path);

    fireEvent.error(img);
    expect(img.src).toContain('no-user.png');
  });

  test('should show a dash when birthday date is empty', () => {
    const actorNoBirthday = fixtureOf<Actor>()
      .with('birthday', () => undefined)
      .with('name', () => 'no Birthday')
      .with('place_of_birth', () => 'city')
      .create();

    useActorMock.mockReturnValue({
      actor: actorNoBirthday,
      credits: mockCredits,
      loading: false,
      error: null,
    });

    render(<ActorPage />);

    const bornStrong = screen.getByText('Born:');
    const bornParagraph = bornStrong.closest('p');
    expect(bornParagraph).toBeInTheDocument();

    expect(bornParagraph).toHaveTextContent(`Born: — in city`);
  });
});
