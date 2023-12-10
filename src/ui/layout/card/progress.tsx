import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Progress = styled(LinearProgress)(() => ({
  borderRadius: 0,
  height: 2,
  width: '100vw !important',
  marginLeft: '50% !important',
  transform: 'translate(-50%, 0px) !important',
}));

export const ProgressShort = styled(LinearProgress)(() => ({
  borderRadius: 0,
  height: 2,
}));
