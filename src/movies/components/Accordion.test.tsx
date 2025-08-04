import { fixtureOf } from 'ts-mock-autofixture-kit';
import { MovieDetail } from '../models/movieDetail';
import { render } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  const mockMovie = fixtureOf<MovieDetail>({ seed: 42 }).create();

  test('CreditsCard matches snapshot', () => {
    const { container } = render(<Accordion movie={mockMovie} />);

    expect(container).toMatchSnapshot();
  });
});
