import React, { MouseEvent, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import { Avatar, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { AccountImage } from '@ui/layout/account/accountImage';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { AccountRoles } from '@ui/layout/account/accountRoles';
import './index.scss';

export const Account = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { firstname, lastname, username, signout, isDataLoading } = useAuth();

  const router = useRouter();
  const signoutHandler = async () => {
    if (await signout()) {
      await router.push({
        pathname: ROUTER_CONST_SCHOOL.HOME.path,
      });
    }
  };

  return (
    <React.Fragment>
      <IconButton color="grey" onClick={handleOpen}>
        <FaceIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-account"
        className="account"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          sx: { mt: 1 },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="account__container">
          <div className="account__top">
            <div className="account__avatar">
              <Avatar sx={{ width: 50, height: 50, fontSize: '1.6rem' }}>
                <AccountImage loading={isDataLoading} src={undefined} name={username} />
              </Avatar>
            </div>
            <div className="account__info">
              <div className="account__user">
                <div className="account__name">{`${firstname} ${lastname}`}</div>
                <div className="account__email">{username}</div>
              </div>
            </div>
          </div>
          <AccountRoles />
        </div>
        <Divider />
        <MenuItem onClick={signoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
});
