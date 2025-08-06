import { render, screen } from '@testing-library/react';
import { Toolbar } from './Toolbar';

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
  { virtual: true },
);

describe('Toolbar', () => {
  test('should render toolbar', () => {
    const { container } = render(
      <Toolbar open={true} drawerWidth={100} handleDrawerOpen={jest.fn()} />,
    );

    expect(container).toMatchSnapshot();
  });

  test('should show menu icon when open is false', () => {
    const { container } = render(
      <Toolbar open={false} drawerWidth={100} handleDrawerOpen={jest.fn()} />,
    );

    const menuIcon = screen.getByTestId('menu-icon');

    expect(menuIcon).toBeInTheDocument();
  });
});
