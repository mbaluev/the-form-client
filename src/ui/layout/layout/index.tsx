import React, { FC, useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import { ILoaderProps, Loader } from '@components/loader';
import { observer } from 'mobx-react';
import { Notifier } from '@ui/notifier';
import { InputAdornment } from '@mui/material';
import { IMenuProps, Menu } from '@ui/layout/menu';
import { Notifications } from '@ui/layout/notifications';
import { TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { useViewModel } from '@hooks/useViewModel';
import { IMenuViewModel } from '@viewModel/modules/menu/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ROUTER_CONST_DEV } from '@app/settings/routerConst/dev';
import { IconButton } from '@components/iconButton';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { Account } from '@ui/layout/account';
import { useRouter } from 'next/router';
import { MEDIA_MD, MEDIA_XS, useWindowSize } from '@hooks/useWindowSize';
import { IconLogo } from '@ui/icons';
import { useAuth } from '@hooks/useAuth';
import { isAccess } from '@ui/permission/permissionWrapper';
import './index.scss';

export interface ILayoutProps {
  className?: string;
  menuProps?: IMenuProps;
  loaderProps?: ILoaderProps;
  notifications?: boolean;
  globalSearch?: boolean;
  support?: boolean;
}

type TLayoutProps = React.PropsWithChildren<ILayoutProps>;

export const Layout = observer((props: TLayoutProps) => {
  const {
    className,
    menuProps,
    loaderProps,
    notifications,
    globalSearch,
    support,
    children,
  } = props;
  const { isOpen: isOpenMenu, setOpen: setOpenMenu } =
    useViewModel<IMenuViewModel>(VIEW_MODEL.Menu);
  const { isOpen: isOpenNotify, setOpen: setOpenNotify } =
    useViewModel<INotifyViewModel>(VIEW_MODEL.Notify);
  const { isAuth, roles: claimRoles } = useAuth();
  const menuClick = () => setOpenMenu(!isOpenMenu);
  const notifyClick = () => setOpenNotify(!isOpenNotify);

  const router = useRouter();
  const size = useWindowSize();
  const cls = classNames('layout', className, {
    layout_overflow: isOpenMenu && size.width <= MEDIA_XS,
  });
  const clsCenter = classNames('layout__center', {
    layout__center_shift: isOpenMenu && size.width <= MEDIA_XS,
  });
  const colorDev = router.pathname.includes(ROUTER_CONST_DEV.home.path)
    ? 'blue'
    : 'grey';

  const isNotifications =
    notifications && isOpenNotify && size.width > MEDIA_MD;

  const [isMenu, setIsMenu] = useState(false);
  useEffect(() => {
    if (!isAuth) {
      setIsMenu(false);
    } else {
      menuProps?.items?.forEach((item) => {
        if (isAccess(claimRoles, item.roles)) {
          setIsMenu(true);
        }
      });
    }
  }, [isAuth]);

  useEffect(() => {
    const resize = () => window.dispatchEvent(new Event('resize'));
    const interval = setInterval(resize, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 310);
  }, [isOpenMenu]);

  return (
    <div className={cls}>
      <div className="layout__top">
        <div className="layout__top-left">
          {menuProps && isMenu && (
            <IconButton onClick={menuClick} color="grey">
              <MenuIcon />
            </IconButton>
          )}
          <Link passHref href={ROUTER_CONST_SCHOOL.HOME.path}>
            {size.width > MEDIA_XS ? (
              <Button startIcon={<IconLogo />} size="medium" variant="text">
                The Form
              </Button>
            ) : (
              <IconButton>
                <IconLogo />
              </IconButton>
            )}
          </Link>
        </div>
        <div className="layout__top-center">
          {globalSearch && (
            <TextFieldControl
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" color="grey">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        <div className="layout__top-right">
          {process.env.NODE_ENV === 'development' && (
            <Link passHref href={ROUTER_CONST_DEV.home.path}>
              <IconButton color={colorDev} tooltip="Dev library">
                <CodeIcon />
              </IconButton>
            </Link>
          )}
          {isAuth ? (
            <React.Fragment>
              {support && (
                <IconButton
                  color="grey"
                  tooltip="Support"
                  tooltipPlacement="bottom"
                >
                  <HeadsetMicIcon />
                </IconButton>
              )}
              {notifications && (
                <IconButton
                  color="grey"
                  tooltip="Notifications"
                  tooltipPlacement="bottom"
                  onClick={notifyClick}
                >
                  <NotificationsIcon />
                </IconButton>
              )}
              <Account />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link passHref href={ROUTER_CONST_SCHOOL.LOGIN.path}>
                <Button>Login</Button>
              </Link>
              <Link passHref href={ROUTER_CONST_SCHOOL.SIGNUP.path}>
                <Button>Signup</Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="layout__middle">
        {menuProps && isMenu && (
          <div className="layout__left">
            <Menu {...menuProps} />
          </div>
        )}
        <div className={clsCenter}>{children}</div>
        {isNotifications && (
          <div className="layout__right">
            <Notifications />
          </div>
        )}
      </div>
      <Loader {...loaderProps} />
      <Notifier />
    </div>
  );
});

export const LayoutEmpty: FC = ({ children }) => <>{children}</>;
