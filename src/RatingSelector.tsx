import { useState } from 'react';
import { Box, Button, CircularProgress, Rating } from '@mui/material';
import { Artwork } from './constants';

export function RatingSelector({
  artwork,
  callback,
  rating,
  setRating,
}: {
  artwork: Artwork;
  callback: () => void;
  rating: number | null;
  setRating: (n: number) => void;
}) {
  const [fetching, setFetching] = useState<boolean>(false);
  const submit = async () => {
    setFetching(true);
    try {
      fetch('https://v0867.mocklab.io/rating', {
        method: 'POST',
        body: JSON.stringify({
          id: artwork.id || '',
          rating,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === 'Success') {
            callback();
          }
        })
        .then(() => {
          setFetching(false);
        });
    } catch {
      setFetching(false);
    }
  };
  return (
    <Box>
      <Box sx={{ marginBottom: 1 }}>
        <Rating
          name={`${artwork.id}-rating`}
          value={rating}
          onChange={(_, newVal) => {
            if (newVal) {
              setRating(newVal);
            }
          }}
        />
      </Box>
      <Button
        variant="outlined"
        size="small"
        disabled={!rating}
        onClick={submit}
        data-testid={`${artwork.id}-button-submit`}
      >
        {fetching ? <CircularProgress size={23} thickness={4} /> : 'Submit'}
      </Button>
    </Box>
  );
}
