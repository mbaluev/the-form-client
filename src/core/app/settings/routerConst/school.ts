export const ROUTER_CONST_SCHOOL: Record<string, any> = {
  HOME: {
    name: 'home',
    label: 'The Form',
    path: '/',
  },
  MODULES: {
    name: 'modules',
    label: 'Modules',
    path: '/module',
  },
  MODULE: {
    name: 'module',
    label: 'Module',
    path: '/module/[id]',
  },
  BLOCK: {
    name: 'block',
    label: 'Block',
    path: '/block/[id]',
  },
  PROFILE: {
    name: 'profile',
    label: 'Profile',
    path: '/account/profile',
  },
  LOGIN: {
    name: 'login',
    label: 'login',
    path: '/account/login',
  },
  SIGNUP: {
    name: 'signup',
    label: 'signup',
    path: '/account/signup',
  },
  ADMIN_MODULES: {
    name: 'adminModules',
    label: 'Modules',
    path: '/admin/module',
  },
  ADMIN_MODULE: {
    name: 'adminModule',
    label: 'Module',
    path: '/admin/module/[id]',
  },
  ADMIN_MODULE_BLOCKS: {
    name: 'adminModuleBlocks',
    label: 'Blocks',
    path: '/admin/module/[id]/block',
  },
  ADMIN_MODULE_BLOCK: {
    name: 'adminModuleBlock',
    label: 'Block',
    path: '/admin/module/[id]/block/[blockId]',
  },
  ADMIN_BLOCKS: {
    name: 'adminBlocks',
    label: 'Blocks',
    path: '/admin/block',
  },
  ADMIN_BLOCK: {
    name: 'adminBlock',
    label: 'Block',
    path: '/admin/block/[id]',
  },
  ADMIN_USERS: {
    name: 'adminUsers',
    label: 'Users',
    path: '/admin/user',
  },
  ADMIN_USER: {
    name: 'adminUser',
    label: 'User',
    path: '/admin/user/[id]',
  },
};
