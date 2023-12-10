import ISO6391, { LanguageCode } from 'iso-639-1';

const mapLanguage = (d: any) => ({
  value: d.code,
  label: `${d.code} - ${d.name}`,
});
const sortLanguage = (a: any, b: any) => {
  if (a.code > b.code) return 1;
  else if (a.code < b.code) return -1;
  else return 0;
};
const allLanguages: LanguageCode[] = ISO6391.getAllCodes();
const items = ISO6391.getLanguages(allLanguages).map(mapLanguage);
items.sort(sortLanguage);
const name = (lang?: string | null) => {
  return items.find((d) => d.value === lang)?.label;
};

const languages = {
  default: 'en',
  items,
  name,
  native: (lang: string) => {
    const regionNames = new Intl.DisplayNames([lang], { type: 'language' });
    return regionNames.of(lang);
  },
};

export default languages;
