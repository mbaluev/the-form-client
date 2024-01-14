import React from 'react';
import { TMenuItemDTO } from 'controller/model/common/menu';
import { ROLES } from '@app/settings/roles';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

export const MENU_CONFIG_SCHOOL: TMenuItemDTO[] = [
  {
    name: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.name,
    label: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label,
    path: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path,
    icon: <SchoolIcon />,
    active: (pathname: string) => {
      return (
        pathname === ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path ||
        pathname === ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path ||
        pathname === ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path
      );
    },
    roles: [ROLES.STUDENT],
  },
  {
    name: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.name,
    label: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label,
    path: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path,
    icon: <BarChartRoundedIcon />,
    active: (pathname: string) => {
      return (
        pathname === ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path ||
        pathname === ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.path ||
        pathname === ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCKS.path ||
        pathname === ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCK.path
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
        name: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCKS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCK.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER.path
          );
        },
      },
    ],
    roles: [ROLES.ADMIN],
  },
];
