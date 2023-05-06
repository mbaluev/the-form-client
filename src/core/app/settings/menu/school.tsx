import React from 'react';
import { TMenuItemDTO } from '@model/menu';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import { ROLES } from '@app/settings/roles';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
    name: 'administration',
    label: 'Administration',
    icon: <SettingsIcon />,
    items: [
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_MODULES.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_MODULES.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_MODULES.path,
        // icon: <SchoolIcon />,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_MODULES.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_MODULE.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCKS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCK.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.path,
        // icon: <LibraryBooksIcon />,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_BLOCK.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_USERS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_USERS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_USERS.path,
        // icon: <PeopleIcon />,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_USERS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_USER.path
          );
        },
      },
    ],
    roles: [ROLES.ADMIN],
  },
];
