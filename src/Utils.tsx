import { Alert, Box, CircularProgress } from '@mui/material';
import './App.css';

export function SuccessToast({ callback }: { callback: (v: boolean) => void }) {
  return (
    <Alert
      onClose={() => {
        callback(false);
      }}
    >
      You successfully rated this artwork!
    </Alert>
  );
}

export function Spinner() {
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
