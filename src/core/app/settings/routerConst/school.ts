import { ROLES } from '@app/settings/roles';

export const ROUTER_CONST_SCHOOL: Record<string, any> = {
  ERROR402: {
    name: '402',
    path: '/402',
  },
  ERROR403: {
    name: '403',
    path: '/403',
  },
  ERROR404: {
    name: '404',
    path: '/404',
  },
  ERROR500: {
    name: '500',
    path: '/500',
  },
  HOME: {
    name: 'home',
    label: 'The Form',
    path: '/',
  },
  ACCOUNT_PROFILE: {
    name: 'accountProfile',
    label: 'Profile',
    path: '/account/profile',
    roles: [ROLES.DISABLE],
  },
  ACCOUNT_SIGN_IN: {
    name: 'accountSignin',
    label: 'signin',
    path: '/account/signin',
    roles: [ROLES.NONE],
  },
  ACCOUNT_SIGN_UP: {
    name: 'accountSignup',
    label: 'signup',
    path: '/account/signup',
    roles: [ROLES.NONE],
  },
  SCHOOL_MODULES: {
    name: 'userModules',
    label: 'Modules',
    path: '/school/module',
    roles: [ROLES.STUDENT],
  },
  SCHOOL_MODULE: {
    name: 'userModule',
    label: 'Module',
    path: '/school/module/[id]',
    roles: [ROLES.STUDENT],
  },
  SCHOOL_BLOCK: {
    name: 'userBlock',
    label: 'Block',
    path: '/school/block/[id]',
    roles: [ROLES.STUDENT],
  },
  ADMIN_MODULES: {
    name: 'adminModules',
    label: 'Modules',
    path: '/admin/module',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE: {
    name: 'adminModule',
    label: 'Module',
    path: '/admin/module/[moduleId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE_BLOCKS: {
    name: 'adminModuleBlocks',
    label: 'Blocks',
    path: '/admin/module/[moduleId]/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE_BLOCK: {
    name: 'adminModuleBlock',
    label: 'Block',
    path: '/admin/module/[moduleId]/block/[blockId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_BLOCKS: {
    name: 'adminBlocks',
    label: 'Blocks',
    path: '/admin/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_BLOCK: {
    name: 'adminBlock',
    label: 'Block',
    path: '/admin/block/[id]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_USERS: {
    name: 'adminUsers',
    label: 'Users',
    path: '/admin/user',
    roles: [ROLES.ADMIN],
  },
  ADMIN_USER: {
    name: 'adminUser',
    label: 'User',
    path: '/admin/user/[id]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_TASKS: {
    name: 'adminTasks',
    label: 'Homeworks',
    path: '/admin/task',
    roles: [ROLES.ADMIN],
  },
  ADMIN_TASK: {
    name: 'adminTask',
    label: 'Homeworks',
    path: '/admin/task/[id]',
    roles: [ROLES.ADMIN],
  },
};
