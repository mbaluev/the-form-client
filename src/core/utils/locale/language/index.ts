import ISO6391, { LanguageCode } from 'iso-639-1';
import { countries } from 'countries-list';

const defaultLanguage = 'en';
const sortLanguage = (a: any, b: any) => {
  if (a.code > b.code) return 1;
  else if (a.code < b.code) return -1;
  else return 0;
};

const mapLanguage = (d: any) => {
  return {
    value: d.code,
    label: `${d.code} - ${d.name}`,
  };
};
const allLanguages: LanguageCode[] = ISO6391.getAllCodes();
const UILanguages: LanguageCode[] = ['en'];
const rtlLanguages: LanguageCode[] = ['he'];

const selectItems = ISO6391.getLanguages(allLanguages).map(mapLanguage);
selectItems.sort(sortLanguage);

const selectUIItems = ISO6391.getLanguages(UILanguages).map(mapLanguage);
selectUIItems.sort(sortLanguage);

const languages = {
  default: defaultLanguage,
  all: allLanguages,
  ui: UILanguages,
  rtl: rtlLanguages,
  selectItems,
  selectUIItems,
  getInfo: (code: string) => {
    return ISO6391.getLanguages([code as LanguageCode])[0];
  },
  getByCountry: (code: string) => {
    const language = countries[code as keyof typeof countries].languages[0];
    if (allLanguages.includes(language as LanguageCode)) {
      return language;
    } else {
      return defaultLanguage;
    }
  },
  getUIByCountry: (code: string) => {
    const language = countries[code as keyof typeof countries].languages[0];
    if (UILanguages.includes(language as LanguageCode)) {
      return language;
    } else {
      return defaultLanguage;
    }
  },
};

export default languages;
