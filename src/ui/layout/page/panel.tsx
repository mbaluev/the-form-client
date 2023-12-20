import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Panel = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
}));
