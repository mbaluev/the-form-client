import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Skeleton, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { AccPopover } from '@ui/layout/navigation/account/accPopover';
import { Fragment, useState, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import { FirstLetters } from '@utils/ui/firstLetters';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const Account = observer(() => {
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (!isLoading) setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <IconButton onClick={handleOpen} sx={{ p: '3px' }}>
        {isAuth &&
          (isLoading ? (
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ backgroundColor: theme.palette.t1Grey['230'] }}
            />
          ) : (
            <Avatar
              variant="circular"
              sx={{
                width: 30,
                height: 30,
                backgroundColor: theme.palette.t1Grey['230'],
                '&:hover': {
                  backgroundColor: theme.palette.t1Grey['210'],
                },
              }}
              src="src"
            >
              <Typography fontSize="0.9rem" fontWeight={600}>
                <FirstLetters name="name" />
              </Typography>
            </Avatar>
          ))}
        {!isAuth && (
          <Avatar
            variant="circular"
            sx={{ width: 30, height: 30, backgroundColor: 'transparent' }}
          >
            <AccountCircleIcon
              sx={{
                color: theme.palette.t1Grey['100'],
                '&:hover': { color: theme.palette.common.white },
              }}
            />
          </Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: { elevation: 2, sx: { mt: 2 } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <AccPopover />
      </Menu>
    </Fragment>
  );
});
