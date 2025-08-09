import { createTheme, ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { Layout } from './Layout';

jest.mock('./Toolbar', () => ({
  Toolbar: () => <div data-testid="mock-toolbar">mock-toolbar</div>,
}));

jest.mock('./Sidebar', () => ({
  Sidebar: () => <div data-testid="mock-sidebar">mock-sidebar</div>,
}));

jest.mock('../../router/AppRouter', () => ({
  AppRouter: () => <div data-testid="mock-router">router</div>,
}));

describe('Layout component', () => {
  const theme = createTheme();

  it('renders correctly (snapshot + presence de Toolbar/Sidebar/Router)', () => {
    const { container, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();

    expect(getByTestId('mock-toolbar')).toBeInTheDocument();
    expect(getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(getByTestId('mock-router')).toBeInTheDocument();
  });

  it('open and close drawer, and change transition.duration', () => {
    const ToolbarMock = ({ handleDrawerOpen }: any) => (
      <button data-testid="open-btn" onClick={handleDrawerOpen}>
        Open
      </button>
    );
    const SidebarMock = ({ handleDrawerClose }: any) => (
      <button data-testid="close-btn" onClick={handleDrawerClose}>
        Close
      </button>
    );

    render(
      <ThemeProvider theme={theme}>
        <Layout ToolbarComponent={ToolbarMock} SidebarComponent={SidebarMock} />
      </ThemeProvider>
    );

    const main = document.querySelector('main')!;
    const { enteringScreen, leavingScreen } = theme.transitions.duration;
    const easing = theme.transitions.easing.sharp;

    expect(main).toHaveStyle(`transition: margin ${leavingScreen}ms ${easing} 0ms`);

    fireEvent.click(screen.getByTestId('open-btn'));
    expect(main).toHaveStyle(`transition: margin ${enteringScreen}ms ${easing} 0ms`);

    fireEvent.click(screen.getByTestId('close-btn'));
    expect(main).toHaveStyle(`transition: margin ${leavingScreen}ms ${easing} 0ms`);
  });
});
