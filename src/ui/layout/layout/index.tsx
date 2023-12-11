import { Fragment, ReactNode, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import { Container, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import Link from 'next/link';
import { ROUTES } from '@settings/routes';
import { MEDIA_XS, useWindowSize } from '@hooks/useWindowSize';
import { Button } from '@theme/button';
import LogoTheForm from '@components/svg/logo/components/theForm';
import MenuIcon from '@mui/icons-material/Menu';
import { TextInputField } from '@components/fields/textInputField';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Account } from '@ui/layout/navigation/account';

interface IProps {
  children?: ReactNode;
  globalSearch?: boolean;
  support?: boolean;
  notifications?: boolean;
}

export const Layout = observer((props: IProps) => {
  const { children, globalSearch, support, notifications } = props;
  const theme = useTheme();
  const size = useWindowSize();

  const { isOpen: isOpenMenu, open: setOpenMenu } = useMenuStore();
  const { isOpen: isOpenNotify, setOpen: setOpenNotify } = useNotifyStore();
  const { isAuth } = useAuthStore();
  const menuClick = () => setOpenMenu(!isOpenMenu);
  const notifyClick = () => setOpenNotify(!isOpenNotify);

  const [isMenu] = useState(true);

  useEffect(() => {
    const resize = () => window.dispatchEvent(new Event('resize'));
    const interval = setInterval(resize, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 310);
  }, [isOpenMenu]);

  return (
    <Container
      id="__lcontainer"
      maxWidth="xl"
      sx={{
        backgroundColor: theme.palette.fGrey['20'],
        height: '100%',
        pt: 3,
        pb: 3,
      }}
    >
      <Stack id="__layout" spacing={3}>
        <Stack id="__layout_top" direction="row" spacing={3}>
          <Stack direction="row" spacing={2}>
            {isMenu && (
              <IconButton
                onClick={menuClick}
                sx={{ fill: theme.palette.fGrey['150'] }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link passHref href={ROUTES.HOME.path}>
              {size.width && size.width <= MEDIA_XS ? (
                <IconButton>
                  <LogoTheForm />
                </IconButton>
              ) : (
                <Button
                  startIcon={
                    <LogoTheForm sx={{ fill: theme.palette.primary.main }} />
                  }
                  variant="text"
                >
                  The Form
                </Button>
              )}
            </Link>
          </Stack>
          <Stack direction="row" flex="1 1 auto">
            {globalSearch && (
              <TextInputField
                placeholder="Search"
                sx={{
                  backgroundColor: theme.palette.common.white,
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fill: theme.palette.fGrey['100'] }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <TuneIcon sx={{ fill: theme.palette.fGrey['100'] }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          </Stack>
          <Stack direction="row" spacing={2}>
            {isAuth ? (
              <Fragment>
                {support && (
                  <IconButton>
                    <HeadsetMicIcon />
                  </IconButton>
                )}
                {notifications && (
                  <IconButton onClick={notifyClick}>
                    <NotificationsIcon />
                  </IconButton>
                )}
                <Account />
              </Fragment>
            ) : (
              <Fragment>
                <Link passHref href={ROUTES.ACCOUNT_SIGN_IN.path}>
                  <Button>Sign in</Button>
                </Link>
                <Link passHref href={ROUTES.ACCOUNT_SIGN_UP.path}>
                  <Button color="success">Sign up</Button>
                </Link>
              </Fragment>
            )}
          </Stack>
        </Stack>
        <Stack id="__layout_bottom" direction="row" spacing={3}>
          {children}
        </Stack>
      </Stack>
    </Container>
  );
});
