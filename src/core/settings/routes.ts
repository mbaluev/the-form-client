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
    path: '/school/block/[id]',
    roles: [ROLES.STUDENT],
  },

  // --
  ADMIN_SETTINGS_USERS: {
    name: 'admin-settings-users',
    label: 'Users',
    path: '/admin/settings/user',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_USER: {
    name: 'admin-settings-user',
    label: 'User',
    path: '/admin/settings/user/[...slug]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_USER_CREATE: {
    name: 'admin-settings-user-create',
    label: 'Create',
    path: '/admin/settings/user/create',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_MODULES: {
    name: 'admin-settings-modules',
    label: 'Modules',
    path: '/admin/settings/module',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_MODULE: {
    name: 'admin-settings-module',
    label: 'Module',
    path: '/admin/settings/module/[...slug]',
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
  ADMIN_SETTINGS_MODULE_CREATE: {
    name: 'admin-settings-module-create',
    label: 'Create',
    path: '/admin/settings/module/create',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_BLOCKS: {
    name: 'admin-settings-blocks',
    label: 'Blocks',
    path: '/admin/settings/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_SETTINGS_BLOCK: {
    name: 'admin-settings-block',
    label: 'Block',
    path: '/admin/settings/block/[...slug]',
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
  ADMIN_SETTINGS_BLOCK_CREATE: {
    name: 'admin-settings-block-create',
    label: 'Create',
    path: '/admin/settings/block/create',
    roles: [ROLES.ADMIN],
  },
  // --

  ADMIN_SETTINGS_MODULE_BLOCK: {
    name: 'admin-settings-module-block',
    label: 'Block',
    path: '/admin/settings/moduleBlock/[...slug]',
    roles: [ROLES.ADMIN],
    tabs: {
      keys: {
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
  ADMIN_SETTINGS_MODULE_BLOCK_CREATE: {
    name: 'admin-settings-module-block-create',
    label: 'Create',
    path: '/admin/settings/moduleBlock/create/[...slug]',
    roles: [ROLES.ADMIN],
  },

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
