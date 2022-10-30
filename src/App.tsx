import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import './App.css';
import { Artwork, artworks } from './constants';
import { getArtwork, getImageUrl } from './helpers';

function App() {
  return (
    <Box className="App" sx={{ margin: 3 }}>
      <Typography variant="h2" sx={{ marginBottom: 3 }}>
        Art Rater
      </Typography>
      <Grid container spacing={2}>
        {artworks.map((artwork: Artwork) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ marginBottom: 4 }}
            key={artwork.id}
          >
            <Paper sx={{ padding: 2, height: '100%' }}>
              <ArtItem artwork={artwork} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

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

function ArtItem({ artwork }: { artwork: Artwork }) {
  const [artDetails, setArtDetails] = useState<ArtDetails>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    getArtwork(artwork.id)
      .then((r) => r.json())
      .then((json) => setArtDetails(json));
  }, [artwork.id]);

  const submit = async () => {
    setFetching(true);
    try {
      fetch('https://v0867.mocklab.io/rating', {
        method: 'POST',
        body: JSON.stringify({
          id: artwork.id,
          rating,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setFetching(false);
        });
    } catch {
      setFetching(false);
    }
  };

  if (!artDetails) {
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

  return (
    <Box className="item" sx={{ height: '100%' }}>
      {!!artDetails && (
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
          <p>Rating: {rating || 'Unrated'}</p>
          <Box sx={{ margin: 'auto', width: 200 }}>
            <Box sx={{ marginBottom: 1 }}>
              <Rating
                name={`${artwork.id}-rating`}
                value={rating}
                onChange={(_, val: number | null) => {
                  setRating(val);
                }}
                data-testid={`${artwork.id}-rating`}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              disabled={!rating}
              onClick={submit}
              data-testid={`${artwork.id}-button`}
            >
              {fetching ? (
                <CircularProgress size={23} thickness={4} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export { App, ArtItem };
