import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MenuItemButton = styled(Button)(() => ({
  position: 'relative',
  justifyContent: 'flex-start',
  '& .MuiSvgIcon-root': { fontSize: '1.5rem' },
  '& .MuiButton-startIcon': { marginRight: 12 },
  '& .MuiButton-endIcon': { position: 'absolute', right: 8 },
}));
