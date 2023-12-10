import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export interface ILoaderProps {
  loading?: boolean;
  size?: number;
  relative?: boolean;
  color?: string;
}

export const Loader = (props: ILoaderProps) => {
  const { loading, size, relative, color } = props;
  return loading ? (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={
        relative
          ? {
              position: 'relative',
              height: '100%',
              width: '100%',
              flex: '1 1 auto',
              zIndex: 'auto',
            }
          : {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }
      }
    >
      <CircularProgress size={size} sx={{ color }} />
    </Stack>
  ) : null;
};

export default Loader;
