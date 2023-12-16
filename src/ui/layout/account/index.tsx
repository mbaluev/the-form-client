import { Fragment, MouseEvent, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import Logout from '@mui/icons-material/Logout';
import { Box, Button, Divider, IconButton, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/router';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { ROUTES } from '@settings/routes';
import { AccountRoles } from '@ui/layout/account/roles';
import { CardAvatar } from '@ui/layout/card/avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Account = observer(() => {
  const { isAuth, firstname, lastname, username, signout } = useAuthStore();
  const theme = useTheme();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = async (e: MouseEvent<any>) => {
    if (isAuth) setAnchorEl(e.currentTarget);
    else await router.push({ pathname: ROUTES.ACCOUNT_SIGN_IN.path });
  };
  const handleClose = () => setAnchorEl(null);
  const handleSignOut = async () => {
    if (await signout()) {
      await router.push({
        pathname: ROUTES.HOME.path,
      });
    }
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <FaceIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{ paper: { elevation: 2, sx: { mt: 2 } } }}
        sx={{ '& .MuiList-root': { p: 0, minWidth: 250 } }}
      >
        <Stack spacing={3} sx={{ minWidth: 300, p: 3 }}>
          <Stack spacing={3} direction="row">
            <CardAvatar name={`${firstname} ${lastname}`} />
            <Stack>
              <Typography
                fontSize="1.2rem"
                fontWeight={600}
              >{`${firstname} ${lastname}`}</Typography>
              <Typography sx={{ color: theme.palette.fGrey['150'] }}>{username}</Typography>
            </Stack>
          </Stack>
          <AccountRoles />
        </Stack>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Button startIcon={<Logout />} onClick={handleSignOut} fullWidth>
            Sign out
          </Button>
        </Box>
      </Menu>
    </Fragment>
  );
});
