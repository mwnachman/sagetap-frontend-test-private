import { Box, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getImageUrl } from './helpers';
import { ArtDetails } from './App';

export function ArtInformation({
  artDetails,
  rating,
  removeItem,
}: {
  artDetails: ArtDetails | undefined;
  rating: number | null;
  removeItem: (n: number) => void;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
        }}
      >
        <CloseOutlinedIcon
          onClick={() => {
            if (artDetails?.data?.id) {
              removeItem(artDetails.data.id);
            }
          }}
        />
      </Box>
      <Typography variant="h5" sx={{ marginTop: 0.5, marginBottom: 0.5 }}>
        {artDetails?.data?.title || 'Unavailable'}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {artDetails?.data?.artist_title || 'Unavailable'}
      </Typography>
      <img
        style={{ height: 100 }}
        src={
          artDetails?.data?.image_id
            ? getImageUrl(artDetails.data.image_id)
            : ''
        }
        alt="Unavailable"
      />
      <p>
        Rating: <span data-testid="rating">{rating || 'Unrated'}</span>
      </p>
    </Box>
  );
}
