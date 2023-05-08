import { ILocaleSample } from '@model/locale';
import { ICurrency } from '@utils/locale/currency/iso-4217';

export interface ILocaleViewModel {
  locale: string;
  currencyInfo?: ICurrency;
  isRtl: boolean;

  country: string;
  language: string;
  format: string;
  currency: string;
  digit: string;
  hourCycle?: string;
  firstDayWeek?: string;
  firstWeekYear?: string;
  timeZone: string;
  dir: string;

  setLanguage: (value: string) => void;

  changeCountry: (value: string) => void;
  changeLanguage: (value: string) => void;
  changeDir: (value: string) => void;
  changeFormat: (value: string) => void;
  changeCurrency: (value: string) => void;
  changeDigit: (value: string) => void;
  changeHourCycle: (value: string) => void;
  changeFirstDayWeek: (value: string) => void;
  changeFirstWeekYear: (value: string) => void;
  changeTimeZone: (value?: string) => void;

  fDate: (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => string;
  fDateFormat: string;
  fTime: (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => string;
  fDateTime: (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => string;

  fNumber: (value?: any, opts?: Intl.NumberFormatOptions) => string;
  fDecimalSeparator: string;
  fThousandSeparator: string;

  fPercent: (value?: any, opts?: Intl.NumberFormatOptions) => string;
  fCurrency: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;
  fCurrencySymbol: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;
  fCurrencyExplicit: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;

  c: (value?: any, to?: string) => any;
  cCurrency: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;
  cCurrencySymbol: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;
  cCurrencyExplicit: (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => string;
  cPercent: (value?: any, opts?: Intl.NumberFormatOptions) => string;

  sample: ILocaleSample;
  monthNames: string[];
  monthNamesShort: string[];
}
