import React from 'react';
import { TMenuItemDTO } from 'controller/model/common/menu';
import { ROLES } from '@app/settings/roles';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

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
    name: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.name,
    label: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.label,
    path: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.path,
    icon: <AssignmentTurnedInIcon />,
    active: (pathname: string) => {
      return (
        pathname === ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.path ||
        pathname === ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCK.path
      );
    },
    roles: [ROLES.ADMIN],
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
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_USERS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_USER.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_TASKS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_TASKS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_TASKS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_TASKS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_TASK.path
          );
        },
      },
      {
        name: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.name,
        label: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.label,
        path: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.path,
        active: (pathname: string) => {
          return (
            pathname === ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.path ||
            pathname === ROUTER_CONST_SCHOOL.ADMIN_QUESTION.path
          );
        },
      },
    ],
    roles: [ROLES.ADMIN],
  },
];
