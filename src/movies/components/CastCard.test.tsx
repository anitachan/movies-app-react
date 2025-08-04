import { fireEvent, render, screen } from '@testing-library/react';
import { CastCard } from './CastCard';
import { fixtureOf } from 'ts-mock-autofixture-kit';
import { Cast } from '../models/cast.model';
import noUser from '../../assets/no-user.png';

const mockUseNavigate = jest.fn();
jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockUseNavigate,
  }),
  { virtual: true },
);

describe('CastCard', () => {
  const mockActor = fixtureOf<Cast>({ seed: 42 }).create();

  test('CreditsCard matches snapshot', () => {
    const { container } = render(<CastCard actor={mockActor} />);

    expect(container).toMatchSnapshot();
  });

  test('should redirect when movie is clicked', () => {
    render(<CastCard actor={mockActor} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledWith(`/actor/${mockActor.id!}`);
  });

  test('should set noUser when poster is empty', () => {
    const mockActorPoster = fixtureOf<Cast>()
      .with('profile_path', () => null)
      .with('name', () => 'No Poster Actor')
      .create();

    render(<CastCard actor={mockActorPoster} />);
    const image = screen.getByAltText('No Poster Actor') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(noUser);
  });
});
