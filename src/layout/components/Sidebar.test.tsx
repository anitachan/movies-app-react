import { render, screen, fireEvent } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Sidebar } from './Sidebar';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  }),
  { virtual: true },
);

describe('Sidebar component', () => {
  const drawerWidth = 240;
  const theme = createTheme();

  const renderSidebar = (props: Partial<React.ComponentProps<typeof Sidebar>> = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <Sidebar
          open={props.open ?? true}
          drawerWidth={props.drawerWidth ?? drawerWidth}
          handleDrawerClose={props.handleDrawerClose ?? jest.fn()}
        />
      </ThemeProvider>,
    );

  test('should show home and favorites and its routes', () => {
    renderSidebar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.map((a) => (a as HTMLAnchorElement).href)).toEqual([
      expect.stringContaining('/home'),
      expect.stringContaining('/favorites'),
    ]);
  });

  test('should call handleDrawerClose when IconButton is clicked', () => {
    const onClose = jest.fn();
    renderSidebar({ handleDrawerClose: onClose });
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should set drawerWidth when open is true', () => {
    const { container } = renderSidebar({ open: true });
    const drawerRoot = container.firstChild as HTMLElement;
    expect(drawerRoot).toHaveStyle(`width: ${drawerWidth}px`);
  });

  test('should set closedMixin when open is false', () => {
    const { container } = renderSidebar({ open: false });
    const drawerRoot = container.firstChild as HTMLElement;
    expect(drawerRoot).toHaveStyle('width: calc(56px + 1px)');
  });

  test('should use ChevronRightIcon when theme.direction is rtl', () => {
    const rtlTheme = createTheme({ direction: 'rtl' });
    const { container } = render(
      <ThemeProvider theme={rtlTheme}>
        <Sidebar open={true} drawerWidth={240} handleDrawerClose={() => {}} />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
