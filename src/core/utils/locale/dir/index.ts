import { LanguageCode } from 'iso-639-1';
import languages from '@utils/locale/language';

const dirs = {
  getDir: (language?: string) => {
    return languages.rtl.includes(language as LanguageCode) ? 'rtl' : 'ltr';
  },
  isRtl: (language?: string) => {
    return languages.rtl.includes(language as LanguageCode);
  },
};

export default dirs;
