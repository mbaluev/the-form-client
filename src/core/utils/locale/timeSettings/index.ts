const HOUR_CYCLE_DEFAULT = 'h24';
const HOUR_CYCLE_ITEMS = {
  h11: 'account-profile-time-settings:h11',
  h12: 'account-profile-time-settings:h12',
  h23: 'account-profile-time-settings:h23',
  h24: 'account-profile-time-settings:h24',
};
const FIRST_DAY_WEEK_ITEMS = {
  1: 'account-profile-time-settings:day-monday',
  2: 'account-profile-time-settings:day-tuesday',
  3: 'account-profile-time-settings:day-wednesday',
  4: 'account-profile-time-settings:day-thursday',
  5: 'account-profile-time-settings:day-friday',
  6: 'account-profile-time-settings:day-saturday',
  7: 'account-profile-time-settings:day-sunday',
};
const FIRST_WEEK_YEAR_ITEMS = {
  1: 'account-profile-time-settings:y1',
  2: 'account-profile-time-settings:y2',
  3: 'account-profile-time-settings:y3',
  4: 'account-profile-time-settings:y4',
  5: 'account-profile-time-settings:y5',
  6: 'account-profile-time-settings:y6',
  7: 'account-profile-time-settings:y7',
};

const timeSettings = {
  hourCycle: {
    default: undefined,
    items: HOUR_CYCLE_ITEMS,
    getByLocale: (locale: string) => {
      const intl = new Intl.Locale(locale);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return intl.hourCycles ? intl.hourCycles[0] : HOUR_CYCLE_DEFAULT;
    },
  },
  firstDayWeek: {
    default: undefined,
    items: FIRST_DAY_WEEK_ITEMS,
    getByLocale: (locale: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Intl.Locale(locale)?.weekInfo?.firstDay.toString();
    },
  },
  firstWeekYear: {
    default: undefined,
    items: FIRST_WEEK_YEAR_ITEMS,
    getByLocale: (locale: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Intl.Locale(locale)?.weekInfo?.minimalDays.toString();
    },
  },
};

export default timeSettings;
