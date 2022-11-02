import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { ArtItem } from './ArtItem';
import { mockArtwork } from './constants/test';
import { getRandomIndex } from './helpers/test';
import { submitRating } from './helpers';

test('for an art item, expect there to be no rating on load', async () => {
  const i = getRandomIndex();
  render(<ArtItem artDetails={mockArtwork[i]} removeItem={() => null} />);

  const ratings = screen.getAllByRole('radio');
  // first five radio buttons are stars
  ratings.slice(0, 5).forEach((rating) => {
    expect(rating).not.toBeChecked();
  });

  const ratingText = screen.getByTestId('rating');
  expect(ratingText.innerHTML).toEqual('Unrated');

  cleanup();
});

test('for an art item, submit button is disabled until a rating is selected', async () => {
  const i = getRandomIndex();
  render(<ArtItem artDetails={mockArtwork[i]} removeItem={() => null} />);
  const button = await screen.getByText('Submit');
  expect(button).toBeDisabled();

  const ratings = screen.getAllByRole('radio');
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
  const i = getRandomIndex();
  render(<ArtItem artDetails={mockArtwork[i]} removeItem={() => null} />);

  const ratingText = screen.getByTestId('rating');
  expect(ratingText.innerHTML).toEqual('Unrated');

  const stars = screen.getAllByRole('radio');
  const rating1 = stars[0];
  fireEvent.click(rating1);
  expect(ratingText.innerHTML).toEqual('1');

  cleanup();
});

test('for an art item, clicking star updates rating display below image to be that number, clicking two different numbers one after the other updates it to the second number', () => {
  const i = getRandomIndex();
  render(<ArtItem artDetails={mockArtwork[i]} removeItem={() => null} />);

  const ratingText = screen.getByTestId('rating');
  expect(ratingText.innerHTML).toEqual('Unrated');

  const stars = screen.getAllByRole('radio');
  const rating1 = stars[0];
  const rating5 = stars[4];
  fireEvent.click(rating1);
  fireEvent.click(rating5);
  expect(ratingText.innerHTML).toEqual('5');

  cleanup();
});

jest.mock('./helpers', () => ({
  ...jest.requireActual('./helpers'),
  submitRating: jest.fn(),
}));

test('for an art item, clicking submit POSTs update, displays a toast success message, hides stars', async () => {
  // The endpoint and payload for the submit button can be found in the submit method in `App.tsx`.
  // For the purpose of this test, please use a mock function instead.
  (submitRating as jest.Mock).mockResolvedValue({ message: 'Success' });

  const i = getRandomIndex();
  render(<ArtItem artDetails={mockArtwork[i]} removeItem={() => null} />);

  const stars = screen.getAllByRole('radio');
  const rating5 = stars[4];
  fireEvent.click(rating5);

  const button = screen.getByText('Submit');
  fireEvent.click(button);

  await waitForElementToBeRemoved(button);

  expect(submitRating).toHaveBeenCalledTimes(1);
  expect(button).not.toBeInTheDocument();
  expect(rating5).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toBeInTheDocument();

  cleanup();
});
