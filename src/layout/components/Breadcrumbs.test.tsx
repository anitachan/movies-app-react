import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

const mockLocation = {
  pathname: '/foo/bar',
  search: '',
  hash: '',
  state: null,
  key: 'test',
};

jest.mock(
  'react-router-dom',
  () => ({
    useLocation: () => mockLocation,
  }),
  { virtual: true }
);

describe('Breadcrumbs', () => {
  test('should create and contain the current route', () => {
    const { container } = render(<Breadcrumbs />);
    const route = screen.getByText('foo');

    expect(container).toMatchSnapshot();
    expect(route).toBeInTheDocument();
  });

  test('skips rendering the ID segment when previous segment is "details"', () => {
    mockLocation.pathname = '/details/123';

    render(<Breadcrumbs />);

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeNull();
  });
});
