import React, { MouseEvent, useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { AccountImage } from '@ui/layout/account/accountImage';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import './index.scss';
import Link from 'next/link';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Button } from '@components/button';

export const Account = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const account = {
    loading: false,
    photo: undefined,
    name: 'MBaluev',
    email: 'mikhail.baluev@gmail.com',
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
                <AccountImage
                  loading={account.loading}
                  src={account.photo}
                  name={account.name}
                />
              </Avatar>
            </div>
            <div className="account__info">
              <div className="account__user">
                <div className="account__name">{account.name}</div>
                <div className="account__email">{account.email}</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <Link passHref href={ROUTER_CONST_SCHOOL.PROFILE.path}>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Profile settings
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
});
