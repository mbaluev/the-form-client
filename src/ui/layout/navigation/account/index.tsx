import { Fragment, MouseEvent, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import Logout from '@mui/icons-material/Logout';
import { Button, Divider, IconButton, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/router';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { ROUTES } from '@settings/routes';
import { AccountRoles } from '@ui/layout/navigation/account/roles';
import { CardAvatar } from '@ui/layout/card/avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Account = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { isAuth, firstname, lastname, username, signout } = useAuthStore();
  const theme = useTheme();

  const router = useRouter();
  const signOutHandler = async () => {
    if (await signout()) {
      await router.push({
        pathname: ROUTES.HOME.path,
      });
    }
  };

  if (!isAuth) return null;

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
        sx={{ '& .MuiList-root': { p: 3 } }}
      >
        <Stack spacing={3} sx={{ minWidth: 300 }}>
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
          <Divider />
          <Button onClick={signOutHandler} startIcon={<Logout fontSize="small" />}>
            Sign out
          </Button>
        </Stack>
      </Menu>
    </Fragment>
  );
});
