import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext, useColorMode } from './ThemeContext';

const TestConsumer: React.FC = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="mode-text">{mode}</span>
      <button data-testid="toggle-btn" onClick={toggleColorMode}>
        Toggle
      </button>
    </div>
  );
};

const DefaultConsumer: React.FC = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="default-mode-text">{mode}</span>
      <button data-testid="default-toggle-btn" onClick={toggleColorMode}>
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext & useColorMode', () => {
  test('should render children and toggles mode between light and dark', () => {
    render(
      <ThemeContext>
        <TestConsumer />
      </ThemeContext>,
    );

    const modeText = screen.getByTestId('mode-text');
    const toggleBtn = screen.getByTestId('toggle-btn');

    expect(modeText).toHaveTextContent('light');

    fireEvent.click(toggleBtn);
    expect(modeText).toHaveTextContent('dark');

    fireEvent.click(toggleBtn);
    expect(modeText).toHaveTextContent('light');
  });

  test('should render its children correctly', () => {
    render(
      <ThemeContext>
        <div data-testid="child">Hello Context</div>
      </ThemeContext>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello Context');
  });

  test('should uses default context values when no ThemeContext is present', () => {
    render(<DefaultConsumer />);

    const defaultModeText = screen.getByTestId('default-mode-text');
    const defaultToggleBtn = screen.getByTestId('default-toggle-btn');

    expect(defaultModeText).toHaveTextContent('light');

    fireEvent.click(defaultToggleBtn);
    expect(defaultModeText).toHaveTextContent('light');
  });
});
