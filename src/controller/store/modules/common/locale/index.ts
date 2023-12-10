import { action, computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { BaseStore } from '@store/modules/base/store';
import currencies from '@utils/locale/currency';
import languages from '@utils/locale/language';
import digits from '@utils/locale/digit';
import timeSettings from '@utils/locale/timeSettings';
import timeZones from '@utils/locale/timeZone';
import dirs from '@utils/locale/dir';
import type ILocaleStore from '@store/modules/common/locale/interface';
import type { ICurrency } from '@utils/locale/currency/iso-4217';
import countries from '@utils/locale/country';

@injectable()
export class LocaleStore extends BaseStore implements ILocaleStore {
  constructor() {
    super();
    makeObservable(this, {
      locale: computed,
      currencyInfo: computed,
      isRtl: computed,
      fDateFormat: computed,
      fDecimalSeparator: computed,
      fThousandSeparator: computed,

      country: observable,
      language: observable,
      dir: observable,
      currency: observable,
      digit: observable,
      hourCycle: observable,
      firstDayWeek: observable,
      firstWeekYear: observable,
      timeZone: observable,

      setCountry: action,
      setLanguage: action,
      setDir: action,
      setCurrency: action,
      setDigit: action,
      setHourCycle: action,
      setFirstDayWeek: action,
      setFirstWeekYear: action,
      setTimeZone: action,

      sample: computed,
      monthNames: computed,
      monthNamesShort: computed,
      languageName: computed,
      countryName: computed,
    });
  }

  // --- computed ---

  get locale(): string {
    return `${this.language}-${this.country}`;
  }

  get currencyInfo(): ICurrency | undefined {
    return currencies.getInfo(this.currency);
  }

  get isRtl(): boolean {
    return dirs.isRtl(this.language);
  }

  // --- state ---

  country = countries.default;

  language = languages.default;

  currency = currencies.default;

  digit = digits.default;

  timeZone = timeZones.default;

  hourCycle?: string = timeSettings.hourCycle.default;

  firstDayWeek?: string = timeSettings.firstDayWeek.default;

  firstWeekYear?: string = timeSettings.firstWeekYear.default;

  dir = dirs.getDir(this.language);

  setCountry = (value: string) => {
    this.country = value;
  };

  setLanguage = (value: string) => {
    this.language = value;
  };

  setCurrency = (value: string) => {
    this.currency = value;
  };

  setDigit = (value: string) => {
    this.digit = value;
  };

  setHourCycle = (value?: string) => {
    if (value) this.hourCycle = value;
    else this.hourCycle = timeSettings.hourCycle.default;
  };

  setFirstDayWeek = (value?: string) => {
    if (value) this.firstDayWeek = value;
    else this.firstDayWeek = timeSettings.firstDayWeek.default;
  };

  setFirstWeekYear = (value?: string) => {
    if (value) this.firstWeekYear = value;
    else this.firstWeekYear = timeSettings.firstWeekYear.default;
  };

  setTimeZone = (value?: string) => {
    if (value) this.timeZone = value;
    else this.timeZone = timeZones.default;
  };

  setDir = (value: 'ltr' | 'rtl') => {
    this.dir = value;
    if (typeof document !== 'undefined') document.dir = value;
  };

  // --- change handlers ---

  changeLanguage = async (value: string) => {
    this.setLanguage(value);
    this.setDir(dirs.getDir(value));
  };

  changeCountry = async (value: string) => {
    this.setCountry(value);
  };

  changeDir = (value: 'ltr' | 'rtl') => {
    this.setDir(value);
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

  fDate = (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => {
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

  fDateParts = (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => {
    const options = {
      dateStyle: 'short',
      numberingSystem: this.digit,
      timeZone: this.timeZone,
      ...opts,
    } as Intl.DateTimeFormatOptions;
    return new Intl.DateTimeFormat(
      locale || this.locale,
      options
    ).formatToParts(value);
  };

  fTime = (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => {
    const options = {
      timeStyle: 'short',
      numberingSystem: this.digit,
      hourCycle: this.hourCycle,
      timeZone: this.timeZone,
      ...opts,
    } as Intl.DateTimeFormatOptions;
    return new Intl.DateTimeFormat(locale || this.locale, options).format(
      value
    );
  };

  fDateTime = (
    value?: Date,
    opts?: Intl.DateTimeFormatOptions,
    locale?: string
  ) => {
    return `${this.fDate(value, opts, locale)} ${this.fTime(
      value,
      opts,
      locale
    )}`;
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
    return value && value !== currencies.unknown ? value : this.currency;
  };

  fCurrency = (
    value?: number,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => {
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
      .map((d) => d.value)
      .join('')
      .trim();
  };

  fCurrencySymbol = (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => {
    const currency = this.fCurrencyGet(to || this.currency);
    if (to !== currencies.unknown) {
      const options = {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'narrowSymbol',
        numberingSystem: this.digit,
        ...opts,
      } as Intl.NumberFormatOptions;
      const f = new Intl.NumberFormat(this.locale, options);
      const parts = f.formatToParts(value);
      parts.forEach((p) => {
        if (p.type === 'currency') {
          p.value = currencies.getSymbol(currency);
        }
      });
      return parts.map((d) => d.value).join('');
    } else {
      return this.fCurrencyExplicit(value, to, opts);
    }
  };

  fCurrencyExplicit = (
    value?: any,
    to?: string,
    opts?: Intl.NumberFormatOptions
  ) => {
    const currency = to || this.currency;
    return `${this.fCurrency(value, currency, opts)} ${currency}`;
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
      currency: this.fCurrencySymbol(num),
      currencyExplicit: this.fCurrencyExplicit(num),
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

  get languageName() {
    return languages.native(this.language);
  }

  get countryName() {
    return countries.native(this.country, this.language);
  }
}
