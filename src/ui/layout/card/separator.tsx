import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SeparatorBase = styled(Divider)(() => ({
  borderWidth: 1,
}));

export const Separator = styled(SeparatorBase)(() => ({
  width: '100vw !important',
  marginLeft: '50% !important',
  transform: 'translate(-50%, 0px) !important',
}));
