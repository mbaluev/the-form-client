import { IMenuItemDTO } from '@model/common/menu';
import { ROUTES } from '@settings/routes';
import { ROLES } from '@settings/roles';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

export const MENU_CONFIG: IMenuItemDTO[] = [
  {
    name: ROUTES.SCHOOL_MODULES.name,
    label: ROUTES.SCHOOL_MODULES.label,
    url: ROUTES.SCHOOL_MODULES.path,
    icon: <SchoolIcon />,
    active: (pathname: string) => {
      return (
        pathname === ROUTES.SCHOOL_MODULES.path ||
        pathname === ROUTES.SCHOOL_MODULE.path ||
        pathname === ROUTES.SCHOOL_BLOCK.path
      );
    },
    roles: [ROLES.STUDENT],
  },
  {
    name: ROUTES.ADMIN_PROGRESS_USERS.name,
    label: ROUTES.ADMIN_PROGRESS_USERS.label,
    url: ROUTES.ADMIN_PROGRESS_USERS.path,
    icon: <BarChartRoundedIcon />,
    active: (pathname: string) => {
      return (
        pathname === ROUTES.ADMIN_PROGRESS_USERS.path ||
        pathname === ROUTES.ADMIN_PROGRESS_MODULES.path ||
        pathname === ROUTES.ADMIN_PROGRESS_BLOCKS.path ||
        pathname === ROUTES.ADMIN_PROGRESS_BLOCK.path
      );
    },
    roles: [ROLES.ADMIN],
  },
  {
    name: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    items: [
      {
        name: ROUTES.ADMIN_SETTINGS_MODULES.name,
        label: ROUTES.ADMIN_SETTINGS_MODULES.label,
        url: ROUTES.ADMIN_SETTINGS_MODULES.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTES.ADMIN_SETTINGS_MODULES.path ||
            pathname === ROUTES.ADMIN_SETTINGS_MODULE.path
          );
        },
      },
      {
        name: ROUTES.ADMIN_SETTINGS_BLOCKS.name,
        label: ROUTES.ADMIN_SETTINGS_BLOCKS.label,
        url: ROUTES.ADMIN_SETTINGS_BLOCKS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTES.ADMIN_SETTINGS_BLOCKS.path ||
            pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path
          );
        },
      },
      {
        name: ROUTES.ADMIN_SETTINGS_USERS.name,
        label: ROUTES.ADMIN_SETTINGS_USERS.label,
        url: ROUTES.ADMIN_SETTINGS_USERS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTES.ADMIN_SETTINGS_USERS.path ||
            pathname === ROUTES.ADMIN_SETTINGS_USER.path
          );
        },
      },
    ],
    roles: [ROLES.ADMIN],
  },
];
