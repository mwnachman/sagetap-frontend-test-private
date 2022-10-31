import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Rating } from '@mui/material';
import './App.css';
import { Artwork } from './constants';
import { getArtwork, getImageUrl } from './helpers';

interface ArtDetailsData {
  title?: string;
  artist_title?: string;
  image_id?: string;
}

interface FullArtDetails {
  data?: ArtDetailsData | undefined;
  rating: number | null;
}

type ArtDetails = FullArtDetails | null;

export default function ArtItemWrapper({ artwork }: { artwork: Artwork }) {
  const [artDetails, setArtDetails] = useState<ArtDetails>(null);

  useEffect(() => {
    getArtwork(artwork.id)
      .then((r) => r.json())
      .then((json) => setArtDetails(json));
  }, [artwork.id]);

  if (!artDetails) {
    return <Spinner />;
  }

  return (
    <Box className="item" sx={{ height: '100%', width: '100%' }}>
      {!!artDetails && <ArtItem artwork={artwork} artDetails={artDetails} />}
    </Box>
  );
}

export function ArtItem({
  artwork,
  artDetails,
}: {
  artwork: Artwork;
  artDetails: ArtDetails | undefined;
}) {
  const [rating, setRating] = useState<number | null>(null);
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
        .then(() => {
          setFetching(false);
        });
    } catch {
      setFetching(false);
    }
  };

  return (
    <Grid
      container
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <h2>{artDetails?.data?.title || 'Unavailable'}</h2>
          <h3>{artDetails?.data?.artist_title || 'Unavailable'}</h3>
          <img
            style={{ width: 100 }}
            src={
              artDetails?.data?.image_id
                ? getImageUrl(artDetails.data.image_id)
                : ''
            }
            alt={artDetails?.data?.title || 'Unavailable'}
          />
          <p>
            Rating: <span data-testid="rating">{rating || 'Unrated'}</span>
          </p>
        </Box>
        <Box>
          <Box sx={{ marginBottom: 1 }}>
            <Rating
              name={`${artwork.id}-rating`}
              value={rating}
              onChange={(_, newVal) => setRating(newVal)}
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
      </Box>
    </Grid>
  );
}

function Spinner() {
  return (
    <Box
      sx={{
        height: 200,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );
}

function RatingButtons({
  artwork,
  rating,
  setRating,
}: {
  artwork: Artwork;
  rating: number;
  setRating: (r: number) => void;
}) {
  return (
    <Grid container>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            marginBottom: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <Box key={i}>
              <Button
                data-testid={`${artwork.id}-rating-${i + 1}`}
                variant="outlined"
                size="small"
                sx={{
                  color: rating === i + 1 ? 'red' : undefined,
                }}
                onClick={(_) => {
                  setRating(i + 1);
                }}
              >
                {i + 1}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}
