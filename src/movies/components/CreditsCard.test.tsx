import { fireEvent, render, screen } from '@testing-library/react';
import { CreditsCard } from './CreditsCard';
import { fixtureOf } from 'ts-mock-autofixture-kit';
import { ActorCast } from '../models/actorCast.model';
import noUser from '../../assets/no-user.png';

const mockUseNavigate = jest.fn();
jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockUseNavigate,
  }),
  { virtual: true },
);

describe('CreditsCard', () => {
  const mockCredit = fixtureOf<ActorCast>({ seed: 42 }).create();

  test('CreditsCard matches snapshot', () => {
    const { container } = render(<CreditsCard credit={mockCredit} />);

    expect(container).toMatchSnapshot();
  });

  test('should redirect when see more is clicked', () => {
    render(<CreditsCard credit={mockCredit} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledWith(`/details/${mockCredit.id!}`);
  });

  test('should set noUser when poster is empty', () => {
    const mockCreditPoster = fixtureOf<ActorCast>()
      .with('release_date', () => new Date().toISOString())
      .with('poster_path', () => null)
      .with('title', () => 'No Poster Movie')
      .create();

    render(<CreditsCard credit={mockCreditPoster} />);
    const image = screen.getByAltText('No Poster Movie') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(noUser);
  });

  test('should set an empty string when release date is empty', () => {
    const mockCreditReleaseDate = fixtureOf<ActorCast>()
      .with('release_date', () => '')
      .create();
    render(<CreditsCard credit={mockCreditReleaseDate} />);

    const elem = screen.getByTestId('cast-credit-info');
    expect(elem).toHaveTextContent(`— as ${mockCreditReleaseDate.character}`);
  });

  test('should set no user when image has an error ', () => {
    render(<CreditsCard credit={mockCredit} />);
    const img = screen.getByAltText(mockCredit.title) as HTMLImageElement;

    expect(img.src).toContain(mockCredit.poster_path);

    fireEvent.error(img);
    expect(img.src).toContain('no-user.png');
  });
});
