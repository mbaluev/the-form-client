import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TextTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'normal',
  color: theme.palette.t1Grey['150'],
}));
