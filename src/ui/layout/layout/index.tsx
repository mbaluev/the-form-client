import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import { Box, Button, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import Link from 'next/link';
import { ROUTES } from '@settings/routes';
import { MEDIA_XS, useWindowSize } from '@hooks/useWindowSize';
import LogoTheForm from '@components/svg/logo/components/theForm';
import { TextInputField } from '@components/fields/textInputField';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Account } from 'ui/layout/account';
import { Notifier } from '@ui/notifier';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { Menu } from '@ui/layout/menu';
import { MenuBtn } from '@ui/layout/menu/btn';

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

  const { isOpen: isOpenNotify, setOpen: setOpenNotify } = useNotifyStore();
  const { isAuth } = useAuthStore();
  const { isLoading } = useAppStore();
  const notifyClick = () => setOpenNotify(!isOpenNotify);

  return (
    <Stack id="__layout" spacing={3} sx={{ p: 3, height: '100%' }}>
      <Stack id="__layout_top" direction="row" spacing={3}>
        <Stack id="__layout_top_logo" direction="row" spacing={3}>
          <MenuBtn />
          <Link passHref href={ROUTES.HOME.path}>
            {size.width && size.width <= MEDIA_XS ? (
              <IconButton>
                <LogoTheForm />
              </IconButton>
            ) : (
              <Button startIcon={<LogoTheForm fill={theme.palette.primary.main} />} variant="text">
                The Form
              </Button>
            )}
          </Link>
        </Stack>
        <Stack id="__layout_top_search" direction="row" flex="1 1 auto">
          {globalSearch && !isLoading && (
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
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          )}
        </Stack>
        <Stack id="__layout_top_account" direction="row" spacing={2}>
          {isAuth && !isLoading && support && (
            <IconButton color="secondary">
              <HeadsetMicIcon />
            </IconButton>
          )}
          {isAuth && !isLoading && notifications && (
            <IconButton color="secondary" onClick={notifyClick}>
              <NotificationsIcon />
            </IconButton>
          )}
          <Account />
        </Stack>
      </Stack>
      <Stack id="__layout_bottom" direction="row" spacing={3} flex="1 1 auto" overflow="hidden">
        <Menu />
        <Box id="__layout_bottom_main" sx={{ flex: '1 1 auto' }}>
          {children}
        </Box>
      </Stack>
      <Notifier />
    </Stack>
  );
});
