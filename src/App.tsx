import { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import './App.css';
import ArtItemWrapper from './ArtItem';
import { Artwork, artworks as seedArtworks } from './constants';

export function App() {
  const [artworks, setArtworks] = useState<Artwork[]>(seedArtworks);

  const removeItem = (id: number) => {
    const index = artworks.findIndex((artwork) => artwork.id === id);
    const newArtworkList = [
      ...artworks.slice(0, index),
      ...artworks.slice(index + 1, artworks.length + 1),
    ];
    setArtworks(newArtworkList);
  };

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
              <ArtItemWrapper artwork={artwork} removeItem={removeItem} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
