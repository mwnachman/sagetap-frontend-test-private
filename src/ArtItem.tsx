import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Spinner, SuccessToast } from './Utils';
import { RatingSelector } from './RatingSelector';
import { ArtInformation } from './ArtInformation';
import { FullArtDetails } from './App';

export default function ArtItemWrapper({
  artDetails,
  removeItem,
}: {
  artDetails: FullArtDetails | undefined;
  removeItem: (n: number) => void;
}) {
  if (!artDetails) {
    return <Spinner />;
  }

  return (
    <Box className="item" sx={{ height: '400px', width: '100%' }}>
      {!!artDetails && (
        <ArtItem artDetails={artDetails} removeItem={removeItem} />
      )}
    </Box>
  );
}

export function ArtItem({
  artDetails,
  removeItem,
}: {
  artDetails: FullArtDetails | undefined;
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
          <ArtInformation artDetails={artDetails} rating={rating} />
          {!rated && artDetails?.data?.id && (
            <RatingSelector
              callback={() => {
                setDisplayToast(true);
                setRated(true);
              }}
              artDetails={artDetails}
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
