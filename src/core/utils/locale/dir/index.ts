import { i18n } from 'next-i18next';

const defaultDir = 'ltr';

const dirs = {
  default: defaultDir,
  getDir: (language?: string) => i18n?.dir(language) || defaultDir,
  isRtl: (language?: string) => i18n?.dir(language) === 'rtl',
};

export default dirs;
