import { render, screen, fireEvent } from '@testing-library/react';
import { App, ArtItem } from './App';
import { artworks } from './constants';

test('has title', () => {
  render(<App />);
  const title = screen.getByText('Art Rater');
  expect(title).toBeInTheDocument();
});

test('for an art item, submit button is disabled until a rating is selected', async () => {
  render(<App />);
  const buttonWrapper = await screen.findByTestId(`${artworks[0].id}-button`);
  const button = buttonWrapper.closest('button');
  expect(button).toBeDisabled();

  const rating = await screen.findByTestId('27992-rating');
  const rating5 = rating?.lastElementChild?.previousSibling;
  expect(rating5).not.toBeChecked();
  const rating5label = rating?.lastElementChild?.previousSibling as Element;
  fireEvent.click(rating5label);
  expect(rating5label).toBeChecked();

  expect(button).not.toBeDisabled();
});

// test('for an art item, clicking numbered button updates rating display below image to be that number', () => {});

// test('for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other', () => {});

// test('for an art item, clicking submit POSTs update, displays a toast success message, hides buttons', () => {
//   // The endpoint and payload for the submit button can be found in the submit method in `App.tsx`.
//   // For the purpose of this test, please use a mock function instead.
// });
