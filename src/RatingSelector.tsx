import { useState } from 'react';
import { Box, Button, CircularProgress, Rating } from '@mui/material';
import { ArtDetails } from './App';

export function RatingSelector({
  artDetails,
  callback,
  rating,
  setRating,
}: {
  artDetails: ArtDetails;
  callback: () => void;
  rating: number | null;
  setRating: (n: number) => void;
}) {
  const id = artDetails?.data?.id || '';
  const [fetching, setFetching] = useState<boolean>(false);
  const submit = async () => {
    setFetching(true);
    try {
      fetch('https://v0867.mocklab.io/rating', {
        method: 'POST',
        body: JSON.stringify({
          id,
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
          name={`${id}-rating`}
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
        data-testid={`${id}-button-submit`}
      >
        {fetching ? <CircularProgress size={23} thickness={4} /> : 'Submit'}
      </Button>
    </Box>
  );
}
