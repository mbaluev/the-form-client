import Menu from '@mui/material/Menu';
import { ReactNode } from 'react';
import { bindMenu } from 'material-ui-popup-state/hooks';
import { Paper } from '@mui/material';
import { PopupState } from 'material-ui-popup-state/hooks';

interface IProps {
  children?: ReactNode;
  popupState: PopupState;
}
export const Drawer = (props: IProps) => {
  const { children, popupState } = props;
  return (
    <Menu
      {...bindMenu(popupState)}
      open={popupState.isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        pointerEvents: 'none',
        '& .MuiList-root': { padding: 0 },
        '& .MuiPaper-root': { borderRadius: 0 },
      }}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '100%',
            left: '0 !important',
            pointerEvents: 'auto',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            transform: 'none !important',
            borderRadius: 0,
          },
        },
      }}
    >
      <Paper elevation={3} sx={{ mt: '14px' }}>
        {children}
      </Paper>
    </Menu>
  );
};
