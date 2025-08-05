import { render } from '@testing-library/react';
import { FavoritesPage } from './FavoritesPage';

describe('FavoritesPage', () => {
  test('should render Favorite Page', () => {
    const { container } = render(<FavoritesPage />);

    expect(container).toMatchSnapshot();
  });
});
