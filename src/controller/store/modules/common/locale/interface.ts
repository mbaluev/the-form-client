import type { ICurrency } from '@utils/locale/currency/iso-4217';
import type IBaseStore from '@store/modules/base/store/interface';

export default interface ILocaleStore extends IBaseStore {
  locale: string;
  currencyInfo?: ICurrency;
  isRtl: boolean;

  language: string;
  country: string;
  currency: string;
  digit: string;
  hourCycle?: string;
  firstDayWeek?: string;
  firstWeekYear?: string;
  timeZone: string;
  dir: 'ltr' | 'rtl';

  setLanguage: (value: string) => void;

  changeLanguage: (value: string) => void;
  changeCountry: (value: string) => void;
  changeCurrency: (value: string) => void;
  changeDigit: (value: string) => void;
  changeHourCycle: (value: string) => void;
  changeFirstDayWeek: (value: string) => void;
  changeFirstWeekYear: (value: string) => void;
  changeTimeZone: (value?: string) => void;
  changeDir: (value: 'ltr' | 'rtl') => void;

  fDateFormat: string;
  fDate: (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => string;
  fTime: (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => string;
  fDateTime: (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => string;

  fNumber: (value?: any, opts?: Intl.NumberFormatOptions) => string;
  fDecimalSeparator: string;
  fThousandSeparator: string;

  fPercent: (value?: any, opts?: Intl.NumberFormatOptions) => string;
  fCurrency: (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => string;
  fCurrencySymbol: (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => string;
  fCurrencyExplicit: (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => string;

  monthNames: string[];
  monthNamesShort: string[];
  languageName?: string;
  countryName?: string;
}
