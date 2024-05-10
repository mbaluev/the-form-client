import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderStyle: 'dashed',
  borderWidth: 2,
  borderColor: theme.palette.fGrey['50'],
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': { borderColor: theme.palette.primary.main },
}));
