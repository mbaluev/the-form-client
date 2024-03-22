import { ROLES } from '@settings/roles';

export const ROUTES: Record<string, any> = {
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
  ACCOUNT_SIGN_IN: {
    name: 'accounts-sign-in',
    label: 'Sign in',
    path: '/account/signin',
    roles: [ROLES.NONE],
  },
  ACCOUNT_SIGN_UP: {
    name: 'account-sign-up',
    label: 'Sign up',
    path: '/account/signup',
    roles: [ROLES.NONE],
  },

  SCHOOL_MODULES: {
    name: 'user-modules',
    label: 'Modules',
    path: '/school/module',
    roles: [ROLES.STUDENT],
  },
  SCHOOL_MODULE: {
    name: 'user-module',
    label: 'Module',
    path: '/school/module/[id]',
    roles: [ROLES.STUDENT],
  },
  SCHOOL_BLOCK: {
    name: 'user-block',
    label: 'Block',
    path: '/school/block/[...slug]',
    roles: [ROLES.STUDENT],
    tabs: {
      keys: {
        materials: 'materials',
        homework: 'homework',
        test: 'test',
      },
      labels: {
        materials: 'Materials',
        homework: 'Homework',
        test: 'Test',
      },
    },
  },

  // --
  SETTINGS_USERS: {
    name: 'settings-users',
    label: 'Users',
    path: '/settings/user',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_USER: {
    name: 'settings-user',
    label: 'User',
    path: '/settings/user/[...slug]',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_USER_CREATE: {
    name: 'settings-user-create',
    label: 'Create',
    path: '/settings/user/create',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_MODULES: {
    name: 'settings-modules',
    label: 'Modules',
    path: '/settings/module',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_MODULE: {
    name: 'settings-module',
    label: 'Module',
    path: '/settings/module/[...slug]',
    roles: [ROLES.ADMIN],
    tabs: {
      keys: {
        details: 'details',
        blocks: 'blocks',
      },
      labels: {
        details: 'Details',
        blocks: 'Blocks',
      },
    },
  },
  SETTINGS_MODULE_CREATE: {
    name: 'settings-module-create',
    label: 'Create',
    path: '/settings/module/create',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_BLOCKS: {
    name: 'settings-blocks',
    label: 'Blocks',
    path: '/settings/block',
    roles: [ROLES.ADMIN],
  },
  SETTINGS_BLOCK: {
    name: 'settings-block',
    label: 'Block',
    path: '/settings/block/[...slug]',
    roles: [ROLES.ADMIN],
    tabs: {
      keys: {
        create: 'create',
        details: 'details',
        materials: 'materials',
        homework: 'homework',
        test: 'test',
      },
      labels: {
        details: 'Details',
        materials: 'Materials',
        homework: 'Homework',
        test: 'Test',
      },
    },
  },
  SETTINGS_BLOCK_CREATE: {
    name: 'settings-block-create',
    label: 'Create',
    path: '/settings/block/create',
    roles: [ROLES.ADMIN],
  },
  // --

  ADMIN_PROGRESS_USERS: {
    name: 'admin-progress-users',
    label: 'Users progress',
    path: '/admin/progress/users',
    roles: [ROLES.ADMIN],
  },
  ADMIN_PROGRESS_MODULES: {
    name: 'admin-progress-modules',
    label: 'User modules progress',
    path: '/admin/progress/modules/[userId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_PROGRESS_BLOCKS: {
    name: 'admin-progress-blocks',
    label: 'User blocks progress',
    path: '/admin/progress/blocks',
    roles: [ROLES.ADMIN],
  },
  ADMIN_PROGRESS_BLOCK: {
    name: 'admin-progress-block',
    label: 'User block progress',
    path: '/admin/progress/blocks/[id]',
    roles: [ROLES.ADMIN],
  },
};
