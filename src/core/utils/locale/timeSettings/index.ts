const TIME_SETTINGS_NAMES = {
  'day-friday': 'Friday',
  'day-monday': 'Monday',
  'day-saturday': 'Saturday',
  'day-sunday': 'Sunday',
  'day-thursday': 'Thursday',
  'day-tuesday': 'Tuesday',
  'day-wednesday': 'Wednesday',
  h11: '0–11 hour system; Midnight starting at 0:00 am',
  h12: '1–12 hour system; Midnight starting at 12:00 am',
  h23: '0–23 hour system; Midnight starting at 0:00',
  h24: '1–24 hour system; Midnight starting at 24:00',
  y1: 'First 1-day week',
  y2: 'First 2-day week',
  y3: 'First 3-day week',
  y4: 'First 4-day week',
  y5: 'First 5-day week',
  y6: 'First 6-day week',
  y7: 'First full week',
};

const HOUR_CYCLE_ITEMS = {
  h11: TIME_SETTINGS_NAMES.h11,
  h12: TIME_SETTINGS_NAMES.h12,
  h23: TIME_SETTINGS_NAMES.h23,
  h24: TIME_SETTINGS_NAMES.h24,
};
const HOUR_CYCLE_DEFAULT = 'h24';

const FIRST_DAY_WEEK_ITEMS = {
  1: TIME_SETTINGS_NAMES['day-monday'],
  2: TIME_SETTINGS_NAMES['day-tuesday'],
  3: TIME_SETTINGS_NAMES['day-wednesday'],
  4: TIME_SETTINGS_NAMES['day-thursday'],
  5: TIME_SETTINGS_NAMES['day-friday'],
  6: TIME_SETTINGS_NAMES['day-saturday'],
  7: TIME_SETTINGS_NAMES['day-sunday'],
};

const FIRST_WEEK_YEAR_ITEMS = {
  1: TIME_SETTINGS_NAMES.y1,
  2: TIME_SETTINGS_NAMES.y2,
  3: TIME_SETTINGS_NAMES.y3,
  4: TIME_SETTINGS_NAMES.y4,
  5: TIME_SETTINGS_NAMES.y5,
  6: TIME_SETTINGS_NAMES.y6,
  7: TIME_SETTINGS_NAMES.y7,
};

const timeSettings = {
  hourCycle: {
    default: undefined,
    selectItems: HOUR_CYCLE_ITEMS,
    getByLocale: (locale: string) => {
      const intl = new Intl.Locale(locale);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return intl.hourCycles ? intl.hourCycles[0] : HOUR_CYCLE_DEFAULT;
    },
  },
  firstDayWeek: {
    default: undefined,
    selectItems: FIRST_DAY_WEEK_ITEMS,
    getByLocale: (locale: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Intl.Locale(locale)?.weekInfo?.firstDay.toString();
    },
  },
  firstWeekYear: {
    default: undefined,
    selectItems: FIRST_WEEK_YEAR_ITEMS,
    getByLocale: (locale: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Intl.Locale(locale)?.weekInfo?.minimalDays.toString();
    },
  },
};

export default timeSettings;
