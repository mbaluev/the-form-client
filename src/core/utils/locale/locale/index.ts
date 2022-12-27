import { LanguageCode } from 'iso-639-1';
import { getCookie } from 'cookies-next';
import countries from '@utils/locale/country';
import languages from '@utils/locale/language';
import currencies from '@utils/locale/currency';
import digits from '@utils/locale/digit';
import cookie from '@utils/cookie';
import timeSettings from '@utils/locale/timeSettings';
import timeZones from '../timeZone';

export interface ILocale {
  language: string;
  country: string;
  format: string;
  currency: string;
  digit: string;
  hourCycle?: string;
  firstDayWeek?: string;
  firstWeekYear?: string;
  timeZone: string;
}

const parseLanguage = (parts: string[], locale?: ILocale) => {
  return locale?.language || languages.ui.find((d) => d === parts[0]) || '';
};

const parseCountry = (parts: string[], locale?: ILocale) => {
  return locale?.country || countries.all.find((d) => d === parts[1]) || '';
};

const parseFormat = (parts: string[], locale?: ILocale) => {
  return locale?.format || languages.all.find((d) => d === parts[0]) || '';
};

const parseCurrency = (country: string, locale?: ILocale) => {
  return locale?.currency || currencies.getByCountry(country);
};

const parseCurrentLocale = (format: string, country: string) => {
  if (format && country) {
    return `${format}-${country}`;
  }
  if (format) {
    return format;
  }
  return '';
};

const parseDigit = (curLocale: string, locale?: ILocale) => {
  return locale?.digit || curLocale ? digits.getByLocale(curLocale) : '';
};

const parseHourCycle = (curLocale: string, locale?: ILocale) => {
  return locale?.hourCycle || curLocale
    ? timeSettings.hourCycle.getByLocale(curLocale)
    : '';
};

const parseFirstDayWeek = (curLocale: string, locale?: ILocale) => {
  return locale?.firstDayWeek || curLocale
    ? timeSettings.firstDayWeek.getByLocale(curLocale)
    : '';
};

const parseFirstWeekYear = (curLocale: string, locale?: ILocale) => {
  return locale?.firstWeekYear || curLocale
    ? timeSettings.firstWeekYear.getByLocale(curLocale)
    : '';
};

const parseTimeZone = (locale?: ILocale) => {
  return locale?.timeZone || '';
};

const parseLocale = (value: string, locale?: ILocale): ILocale => {
  const parts = value.split('-') as [LanguageCode, string];

  const language = parseLanguage(parts, locale);
  const country = parseCountry(parts, locale);
  const format = parseFormat(parts, locale);
  const currency = parseCurrency(country, locale);
  const curLocale = parseCurrentLocale(format, country);
  const digit = parseDigit(curLocale, locale);
  const hourCycle = parseHourCycle(curLocale, locale);
  const firstDayWeek = parseFirstDayWeek(curLocale, locale);
  const firstWeekYear = parseFirstWeekYear(curLocale, locale);
  const timeZone = parseTimeZone(locale);

  return {
    language,
    country,
    format,
    currency,
    digit,
    hourCycle,
    firstDayWeek,
    firstWeekYear,
    timeZone,
  };
};

const detectLocale = () => {
  let browserLocale: ILocale = {
    language: getCookie(cookie.names.language) as string,
    country: getCookie(cookie.names.country) as string,
    format: getCookie(cookie.names.format) as string,
    currency: getCookie(cookie.names.currency) as string,
    digit: getCookie(cookie.names.digit) as string,
    hourCycle: getCookie(cookie.names.hourCycle) as string,
    firstDayWeek: getCookie(cookie.names.firstDayWeek) as string,
    firstWeekYear: getCookie(cookie.names.firstWeekYear) as string,
    timeZone: getCookie(cookie.names.timeZone) as string,
  };

  if (typeof navigator !== 'undefined') {
    browserLocale = parseLocale(navigator.language, browserLocale);
    navigator.languages.forEach((lang) => {
      browserLocale = parseLocale(lang, browserLocale);
    });
  }

  const language = browserLocale.language || languages.default;
  const country = browserLocale.country || countries.default;
  const format = browserLocale.format || languages.default;
  const currency = browserLocale.currency || currencies.default;
  const digit = browserLocale.digit || digits.default;
  const hourCycle = browserLocale.hourCycle || timeSettings.hourCycle.default;
  const firstDayWeek =
    browserLocale.firstDayWeek || timeSettings.firstDayWeek.default;
  const firstWeekYear =
    browserLocale.firstWeekYear || timeSettings.firstWeekYear.default;
  const timeZone = browserLocale.timeZone || timeZones.default;

  return {
    language,
    country,
    format,
    currency,
    digit,
    hourCycle,
    firstDayWeek,
    firstWeekYear,
    timeZone,
  };
};

const locales = {
  detect: detectLocale,
};

export default locales;
