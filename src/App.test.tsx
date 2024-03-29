import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';

test('has title', async () => {
  render(<App />);
  const title = screen.getByText('Art Rater');
  expect(title).toBeInTheDocument();
  cleanup();
});
