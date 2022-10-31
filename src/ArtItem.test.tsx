import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { ArtItem } from './ArtItem';
import { artworks } from './constants';

test('for an art item, submit button is disabled until a rating is selected', async () => {
  const art = artworks[0];
  render(<ArtItem artwork={art} artDetails={undefined} />);
  const button = await screen.getByText('Submit');
  expect(button).toBeDisabled();

  const ratings = screen.getAllByRole('radio');
  // first five radio buttons are stars
  ratings.slice(0, 5).forEach((rating) => {
    expect(rating).not.toBeChecked();
  });

  const rating5 = ratings[4];
  fireEvent.click(rating5);
  expect(rating5).toBeChecked();

  ratings.slice(0, 4).forEach((rating) => {
    expect(rating).not.toBeChecked();
  });

  expect(button).not.toBeDisabled();
  cleanup();
});

test('for an art item, clicking star updates rating display below image to be that number', () => {
  const art = artworks[0];
  render(<ArtItem artwork={art} artDetails={undefined} />);

  const ratingText = screen.getByTestId('rating');
  expect(ratingText.innerHTML).toEqual('Unrated');

  const radioButtons = screen.getAllByRole('radio');
  const rating1 = radioButtons[0];
  fireEvent.click(rating1);
  expect(ratingText.innerHTML).toEqual('1');

  const rating5 = radioButtons[4];
  fireEvent.click(rating5);
  expect(ratingText.innerHTML).toEqual('5');
});

// test('for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other', () => {});

// test('for an art item, clicking submit POSTs update, displays a toast success message, hides buttons', () => {
//   // The endpoint and payload for the submit button can be found in the submit method in `App.tsx`.
//   // For the purpose of this test, please use a mock function instead.
// });
