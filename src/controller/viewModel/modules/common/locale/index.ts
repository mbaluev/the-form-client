import { action, computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { setCookies, removeCookies } from 'cookies-next';
import { BaseViewModel } from 'controller/viewModel/modules/base/base';
import { ILocaleViewModel } from '@viewModel/modules/common/locale/interface';
import locales from '@utils/locale/locale';
import languages from '@utils/locale/language';
import currencies, { NACurrency } from '@utils/locale/currency';
import digits from '@utils/locale/digit';
import { ICurrency } from '@utils/locale/currency/iso-4217';
import cookie from '@utils/cookie';
import timeSettings from '@utils/locale/timeSettings';
import { RATES } from '@utils/rates';
import timeZones from '@utils/locale/timeZone';
import dirs from '@utils/locale/dir';

@injectable()
export class LocaleViewModel extends BaseViewModel implements ILocaleViewModel {
  constructor() {
    super();
    makeObservable(this, {
      locale: computed,
      currencyInfo: computed,
      isRtl: computed,
      fDateFormat: computed,
      fThousandSeparator: computed,
      fDecimalSeparator: computed,

      country: observable,
      language: observable,
      dir: observable,
      format: observable,
      currency: observable,
      digit: observable,
      hourCycle: observable,
      firstDayWeek: observable,
      firstWeekYear: observable,
      timeZone: observable,

      setCountry: action,
      setLanguage: action,
      setDir: action,
      setFormat: action,
      setCurrency: action,
      setDigit: action,
      setHourCycle: action,
      setFirstDayWeek: action,
      setFirstWeekYear: action,
      setTimeZone: action,

      sample: computed,
      monthNames: computed,
      monthNamesShort: computed,
    });
  }

  // --- computed ---

  get locale(): string {
    return `${this.format}-${this.country}`;
  }

  get currencyInfo(): ICurrency | undefined {
    return currencies.getInfo(this.currency);
  }

  get isRtl(): boolean {
    return dirs.isRtl(this.language);
  }

  // --- state ---

  localeDetected = locales.detect();

  country = this.localeDetected.country;

  language = this.localeDetected.language;

  format = this.localeDetected.format;

  currency = this.localeDetected.currency;

  digit = this.localeDetected.digit;

  hourCycle = this.localeDetected.hourCycle;

  firstDayWeek = this.localeDetected.firstDayWeek;

  firstWeekYear = this.localeDetected.firstWeekYear;

  timeZone = this.localeDetected.timeZone;

  dir = dirs.getDir(this.language);

  setCountry = (value: string) => {
    setCookies(cookie.names.country, value, cookie.options);
    this.country = value;
  };

  setLanguage = (value: string) => {
    setCookies(cookie.names.language, value, cookie.options);
    this.language = value;
  };

  setFormat = (value: string) => {
    setCookies(cookie.names.format, value, cookie.options);
    this.format = value;
  };

  setCurrency = (value: string) => {
    setCookies(cookie.names.currency, value, cookie.options);
    this.currency = value;
  };

  setDigit = (value: string) => {
    setCookies(cookie.names.digit, value, cookie.options);
    this.digit = value;
  };

  setHourCycle = (value?: string) => {
    if (value) {
      setCookies(cookie.names.hourCycle, value, cookie.options);
      this.hourCycle = value;
    } else {
      removeCookies(cookie.names.hourCycle);
      this.hourCycle = undefined;
    }
  };

  setFirstDayWeek = (value?: string) => {
    if (value) {
      setCookies(cookie.names.firstDayWeek, value, cookie.options);
      this.firstDayWeek = value;
    } else {
      removeCookies(cookie.names.firstDayWeek);
      this.firstDayWeek = undefined;
    }
  };

  setFirstWeekYear = (value?: string) => {
    if (value) {
      setCookies(cookie.names.firstWeekYear, value, cookie.options);
      this.firstWeekYear = value;
    } else {
      removeCookies(cookie.names.firstWeekYear);
      this.firstWeekYear = undefined;
    }
  };

  setTimeZone = (value?: string) => {
    if (value) {
      setCookies(cookie.names.timeZone, value, cookie.options);
      this.timeZone = value;
    } else {
      removeCookies(cookie.names.timeZone);
      this.timeZone = timeZones.default;
    }
  };

  setDir = (value: string) => {
    this.dir = value;
    if (typeof document !== 'undefined') {
      document.dir = value;
    }
  };

  // --- change handlers ---

  changeCountry = async (value: string) => {
    this.setCountry(value);
    this.setLanguage(languages.getUIByCountry(value));
    this.setFormat(languages.getByCountry(value));
    this.setCurrency(currencies.getByCountry(value));
    this.setDigit(digits.getByLocale(this.locale));
    this.setHourCycle(timeSettings.hourCycle.getByLocale(this.locale));
    this.setFirstDayWeek(timeSettings.firstDayWeek.getByLocale(this.locale));
    this.setFirstWeekYear(timeSettings.firstWeekYear.getByLocale(this.locale));
    this.setDir(dirs.getDir(this.language));
  };

  changeLanguage = async (value: string) => {
    this.setLanguage(value);
    this.setDir(dirs.getDir(value));
  };

  changeDir = (value: string) => {
    this.setDir(value);
  };

  changeFormat = (value: string) => {
    this.setFormat(value);
    // this.setDigit(digits.getByLocale(this.locale));
    // this.setHourCycle(timeSettings.hourCycle.getByLocale(this.locale));
    // this.setFirstDayWeek(timeSettings.firstDayWeek.getByLocale(this.locale));
    // this.setFirstWeekYear(
    //   timeSettings.firstWeekYear.getByLocale(this.locale)
    // );
  };

  changeCurrency = (value: string) => {
    this.setCurrency(value);
  };

  changeDigit = (value: string) => {
    this.setDigit(value);
  };

  changeHourCycle = (value: string) => {
    this.setHourCycle(value);
  };

  changeFirstDayWeek = (value: string) => {
    this.setFirstDayWeek(value);
  };

  changeFirstWeekYear = (value: string) => {
    this.setFirstWeekYear(value);
  };

  changeTimeZone = (value?: string) => {
    this.setTimeZone(value);
  };

  // --- formats ---

  fDate = (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => {
    let displayValue = '';
    this.fDateParts(value, opts, locale)
      .map((d) => {
        return this.isRtl ? d.value : d.value.replace('‏', '');
      })
      .forEach((d) => {
        displayValue += d;
      });
    return displayValue;
  };

  fDateParts = (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => {
    const options = {
      dateStyle: 'short',
      numberingSystem: this.digit,
      timeZone: this.timeZone,
      ...opts,
    } as Intl.DateTimeFormatOptions;
    return new Intl.DateTimeFormat(locale || this.locale, options).formatToParts(value);
  };

  fTime = (value?: Date, opts?: Intl.DateTimeFormatOptions) => {
    const options = {
      timeStyle: 'short',
      numberingSystem: this.digit,
      hourCycle: this.hourCycle,
      timeZone: this.timeZone,
      ...opts,
    } as Intl.DateTimeFormatOptions;
    return new Intl.DateTimeFormat(this.locale, options).format(value);
  };

  fDateTime = (value?: Date, opts?: Intl.DateTimeFormatOptions, locale?: string) => {
    return `${this.fDate(value, opts, locale)} ${this.fTime(value, opts)}`;
  };

  fNumber = (value?: any, opts?: Intl.NumberFormatOptions) => {
    const options = {
      style: 'decimal',
      numberingSystem: this.digit,
      ...opts,
    } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat(this.locale, options).format(value);
  };

  fNumberParts = (value?: any, opts?: Intl.NumberFormatOptions) => {
    const options = {
      style: 'decimal',
      numberingSystem: this.digit,
      ...opts,
    } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat(this.locale, options).formatToParts(value);
  };

  fPercent = (value?: any, opts?: Intl.NumberFormatOptions) => {
    const options = {
      style: 'percent',
      numberingSystem: this.digit,
      maximumFractionDigits: 2,
      ...opts,
    } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat(this.locale, options).format(value / 100);
  };

  fCurrencyGet = (value?: string) => {
    return value && value !== NACurrency ? value : this.currency;
  };

  fCurrency = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const currency = this.fCurrencyGet(to);
    const options = {
      style: 'currency',
      currency: currency,
      numberingSystem: this.digit,
      ...opts,
    } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat(this.locale, options)
      .formatToParts(value)
      .filter((d) => d.type !== 'currency')
      .map((d) => {
        return d.value;
      })
      .join('')
      .trim();
  };

  fCurrencySymbol = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const currency = this.fCurrencyGet(to);
    if (to !== NACurrency) {
      const options = {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'narrowSymbol',
        numberingSystem: this.digit,
        ...opts,
      } as Intl.NumberFormatOptions;
      return new Intl.NumberFormat(this.locale, options).format(value);
    } else {
      return this.fCurrencyExplicit(value, to, opts);
    }
  };

  fCurrencyExplicit = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const currency = to || this.currency;
    return `${this.fCurrency(value, currency, opts)} ${currency}`;
  };

  // --- convert currencies ---

  c = (value?: any, to?: string) => {
    const currency = to || this.currency;
    let cValue = value;
    if (currency !== currencies.default) {
      cValue = value * RATES.rates[currency as keyof typeof RATES.rates];
    }
    return cValue;
  };

  cCurrency = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const cValue = this.c(value, to);
    return this.fCurrency(cValue, to, opts);
  };

  cCurrencySymbol = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const cValue = this.c(value, to);
    return this.fCurrencySymbol(cValue, to, opts);
  };

  cCurrencyExplicit = (value?: any, to?: string, opts?: Intl.NumberFormatOptions) => {
    const cValue = this.c(value, to);
    return this.fCurrencyExplicit(cValue, to, opts);
  };

  cPercent = (value?: any, opts?: Intl.NumberFormatOptions) => {
    const options = {
      style: 'percent',
      numberingSystem: this.digit,
      maximumFractionDigits: 2,
      ...opts,
    } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat(this.locale, options).format(value);
  };

  // --- sample ---

  get sample() {
    const today = new Date();
    const num = 1234567890.12345;
    return {
      date: this.fDate(today),
      dateFormat: this.fDateFormat,
      time: this.fTime(today),
      number: this.fNumber(num),
      currency: this.cCurrencySymbol(num),
      currencyExplicit: this.cCurrencyExplicit(num),
    };
  }

  // --- helpers ---

  get monthNames() {
    const format = new Intl.DateTimeFormat(this.language, { month: 'long' });
    const months = [];
    for (let month = 0; month < 12; month++) {
      const testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
      months.push(format.format(testDate));
    }
    return months;
  }

  get monthNamesShort() {
    const format = new Intl.DateTimeFormat(this.language, { month: 'short' });
    const months = [];
    for (let month = 0; month < 12; month++) {
      const testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
      months.push(format.format(testDate));
    }
    return months;
  }

  get fDateFormat(): string {
    const parts = this.fDateParts(new Date());
    let format = '';
    parts.forEach((part) => {
      const length = part.value.length;
      if (part.type === 'month') {
        for (let i = 0; i < length; i++) format += 'M';
      }
      if (part.type === 'year') {
        for (let i = 0; i < length; i++) format += 'y';
      }
      if (part.type === 'day') {
        for (let i = 0; i < length; i++) format += 'd';
      }
      if (part.type === 'literal') {
        format += part.value;
      }
    });
    return format;
  }

  get fDecimalSeparator(): string {
    const parts = this.fNumberParts(0.1);
    let separator = '';
    parts.forEach((part) => {
      if (part.type === 'decimal') separator = part.value;
    });
    return separator;
  }

  get fThousandSeparator(): string {
    const parts = this.fNumberParts(1000);
    let separator = '';
    parts.forEach((part) => {
      if (part.type === 'group') separator = part.value;
    });
    return separator;
  }
}
