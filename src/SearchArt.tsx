import { useState } from 'react';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import './App.css';
import { ArtDetails } from './App';
import { getArtwork } from './helpers';

export function SearchArt({
  addItem,
  artworks,
}: {
  addItem: (item: ArtDetails) => void;
  artworks: ArtDetails[];
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const search = () => {
    setError('');
    const index = artworks.findIndex(
      (artwork) => artwork?.data?.id === Number(value)
    );
    if (index > -1) {
      setError('This artwork is already on the page');
    } else {
      getArtwork(Number(value))
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            addItem(res);
          } else if (res?.status >= 400) {
            setError(res.detail);
          }
        })
        .catch((e) => console.error('Error: ', e));
    }
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          <TextField
            name="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Art Institute of Chicago ID"
            size="small"
            sx={{ width: '300px', marginRight: 3 }}
          />
          {!!error && (
            <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>
          )}
        </Box>
        <Button variant="contained" onClick={search} sx={{ height: '38px' }}>
          Add Art
        </Button>
      </Box>
    </Box>
  );
}
