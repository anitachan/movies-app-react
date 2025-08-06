import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { createTheme, ThemeProvider } from '@mui/material';
import { useColorMode } from '../context/ThemeContext';

jest.mock('../context/ThemeContext', () => ({
  useColorMode: jest.fn(),
}));

describe('ThemeToggleButton', () => {
  const useColorModeMock = useColorMode as jest.MockedFunction<typeof useColorMode>;
  beforeEach(async () => {
    useColorModeMock.mockReturnValue({
      toggleColorMode: jest.fn(),
      mode: 'light',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render toggle button', () => {
    const { container } = render(<ThemeToggleButton />);

    expect(container).toMatchSnapshot();
  });

  it('should show Brightness7 icon in dark mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    render(
      <ThemeProvider theme={darkTheme}>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    const sunIcon = screen.getByTestId('brightness7');
    expect(sunIcon).toBeInTheDocument();

    fireEvent.click(sunIcon.closest('button')!);
  });

  it('should show Brightness7 icon in light mode', () => {
    const darkTheme = createTheme({ palette: { mode: 'light' } });

    render(
      <ThemeProvider theme={darkTheme}>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    const sunIcon = screen.getByTestId('brightness4');
    expect(sunIcon).toBeInTheDocument();
  });
});
