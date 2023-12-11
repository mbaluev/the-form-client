import { Fragment, MouseEvent, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import { Divider, IconButton } from '@mui/material';
import { observer } from 'mobx-react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/router';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { ROUTES } from '@settings/routes';
import { AccountRoles } from '@ui/layout/navigation/account/accountRoles';
import classes from './index.module.scss';
import { CardAvatar } from '@ui/layout/card/avatar';

export const Account = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { isAuth, firstname, lastname, username, signout } = useAuthStore();

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
        id="menu-account"
        className={classes.account}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          sx: { mt: 2 },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className={classes.account__container}>
          <div className={classes.account__top}>
            <div className={classes.account__avatar}>
              <CardAvatar name={`${firstname} ${lastname}`} />
            </div>
            <div className={classes.account__info}>
              <div className={classes.account__user}>
                <div
                  className={classes.account__name}
                >{`${firstname} ${lastname}`}</div>
                <div className={classes.account__email}>{username}</div>
              </div>
            </div>
          </div>
          <AccountRoles />
        </div>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <MenuItem onClick={signOutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Fragment>
  );
});
