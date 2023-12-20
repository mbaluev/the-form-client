import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProgressBase = styled(LinearProgress)(() => ({
  borderRadius: 0,
  height: 2,
}));

export const Progress = styled(ProgressBase)(() => ({
  width: '100vw !important',
  marginLeft: '50% !important',
  transform: 'translate(-50%, 0px) !important',
}));
