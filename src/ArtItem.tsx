import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Artwork } from './constants';
import { getArtwork } from './helpers';
import { Spinner, SuccessToast } from './Utils';
import { RatingSelector } from './RatingSelector';
import { ArtInformation } from './ArtInformation';

interface ArtDetailsData {
  title?: string;
  artist_title?: string;
  image_id?: string;
  id?: number;
}

interface FullArtDetails {
  data?: ArtDetailsData | undefined;
  rating: number | null;
}

export type ArtDetails = FullArtDetails | null;

export default function ArtItemWrapper({
  artwork,
  removeItem,
}: {
  artwork: Artwork;
  removeItem: (n: number) => void;
}) {
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
    <Box className="item" sx={{ height: '400px', width: '100%' }}>
      {!!artDetails && (
        <ArtItem
          artwork={artwork}
          artDetails={artDetails}
          removeItem={removeItem}
        />
      )}
    </Box>
  );
}

export function ArtItem({
  artwork,
  artDetails,
  removeItem,
}: {
  artwork: Artwork;
  artDetails: ArtDetails | undefined;
  removeItem: (n: number) => void;
}) {
  const [rated, setRated] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [displayToast, setDisplayToast] = useState<boolean>(false);

  useEffect(() => {
    if (displayToast) {
      const timer = setTimeout(() => {
        setDisplayToast(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [displayToast, setDisplayToast]);

  return (
    <>
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
          <ArtInformation
            artDetails={artDetails}
            rating={rating}
            removeItem={removeItem}
          />
          {!rated && (
            <RatingSelector
              callback={() => {
                setDisplayToast(true);
                setRated(true);
              }}
              artwork={artwork}
              rating={rating}
              setRating={setRating}
            />
          )}
          {displayToast && <SuccessToast callback={setDisplayToast} />}
        </Box>
      </Grid>
    </>
  );
}

// function RatingButtons({
//   artwork,
//   rating,
//   setRating,
// }: {
//   artwork: Artwork;
//   rating: number;
//   setRating: (r: number) => void;
// }) {
//   return (
//     <Grid container>
//       <Box sx={{ width: '100%' }}>
//         <Box
//           sx={{
//             marginBottom: 1,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}
//         >
//           {[...Array(5)].map((_, i) => (
//             <Box key={i}>
//               <Button
//                 data-testid={`${artwork.id}-rating-${i + 1}`}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   color: rating === i + 1 ? 'red' : undefined,
//                 }}
//                 onClick={(_) => {
//                   setRating(i + 1);
//                 }}
//               >
//                 {i + 1}
//               </Button>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Grid>
//   );
// }
