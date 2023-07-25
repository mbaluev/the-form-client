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
  ADMIN_SETTINGS_MODULES: {
    name: 'adminSettingsModules',
    label: 'Modules',
    path: '/admin/settings/module',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_MODULE: {
    name: 'adminSettingsModule',
    label: 'Module',
    path: '/admin/settings/module/[moduleId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_MODULE_BLOCKS: {
    name: 'adminSettingsModuleBlocks',
    label: 'Blocks',
    path: '/admin/settings/module/[moduleId]/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_MODULE_BLOCK: {
    name: 'adminSettingsModuleBlock',
    label: 'Block',
    path: '/admin/settings/module/[moduleId]/block/[blockId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_BLOCKS: {
    name: 'adminSettingsBlocks',
    label: 'Blocks',
    path: '/admin/settings/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_BLOCK: {
    name: 'adminSettingsBlock',
    label: 'Block',
    path: '/admin/settings/block/[id]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_USERS: {
    name: 'adminSettingsUsers',
    label: 'Users',
    path: '/admin/settings/user',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_USER: {
    name: 'adminSettingsUser',
    label: 'User',
    path: '/admin/settings/user/[id]',
    roles: [ROLES.ADMIN],
  },

  ADMIN_SETTINGS_USER_BLOCKS: {
    name: 'adminSettingsUserTasks',
    label: 'Users progress',
    path: '/admin/settings/userBlock',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_USER_BLOCK: {
    name: 'adminSettingsUserBlock',
    label: 'User progress',
    path: '/admin/settings/userBlock/[id]',
    roles: [ROLES.ADMIN],
  },

  ADMIN_PROGRESS_USERS: {
    name: 'adminProgressUsers',
    label: 'Users progress',
    path: '/admin/progress/users',
    roles: [ROLES.ADMIN],
  },
};
