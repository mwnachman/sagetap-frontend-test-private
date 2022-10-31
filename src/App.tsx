import { Box, Grid, Paper, Typography } from '@mui/material';
import './App.css';
import ArtItemWrapper from './ArtItem';
import { Artwork, artworks } from './constants';

export function App() {
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
              <ArtItemWrapper artwork={artwork} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
