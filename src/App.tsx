import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import './App.css';
import ArtItemWrapper from './ArtItem';
import { SearchArt } from './SearchArt';
import { getSeedArtworks } from './helpers';

interface ArtDetailsData {
  title?: string;
  artist_title?: string;
  image_id?: string;
  id?: number;
}

export interface FullArtDetails {
  data?: ArtDetailsData | undefined;
  rating: number | null;
}

export type ArtDetails = FullArtDetails | null;

export function App() {
  const [artworks, setArtworks] = useState<ArtDetails[]>([]);

  useEffect(() => {
    const getArt = async () => {
      const art: (FullArtDetails | null)[] = await getSeedArtworks();
      return art;
    };
    getArt().then((art) => setArtworks(art));
  }, []);

  const removeItem = (id: number) => {
    const index = artworks.findIndex((artwork) => artwork?.data?.id === id);
    const newArtworkList = [
      ...artworks.slice(0, index),
      ...artworks.slice(index + 1, artworks.length + 1),
    ];
    setArtworks(newArtworkList);
  };

  const addItem = (item: ArtDetails) => {
    setArtworks([...artworks, item]);
  };

  return (
    <Box className="App" sx={{ margin: 3 }}>
      <Typography variant="h2" sx={{ marginBottom: 3 }}>
        Art Rater
      </Typography>
      <SearchArt addItem={addItem} artworks={artworks} />
      <Grid container spacing={2}>
        {(artworks || []).map((artDetail: ArtDetails) => {
          if (artDetail?.data?.id) {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ marginBottom: 4 }}
                key={artDetail.data.id}
              >
                <Paper sx={{ padding: 2, height: '100%' }}>
                  <ArtItemWrapper
                    artDetails={artDetail}
                    removeItem={removeItem}
                  />
                </Paper>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Box>
  );
}
