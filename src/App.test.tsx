import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./layout/components/Layout', () => ({
  Layout: () => <div data-testid="mock-layout">Layout Mock</div>,
}));

test('renders learn react link', () => {
  render(<App />);
  const layout = screen.getByTestId('mock-layout');
  expect(layout).toBeInTheDocument();
});
