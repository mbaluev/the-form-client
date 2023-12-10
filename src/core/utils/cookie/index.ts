const cookie = {
  names: {
    language: 'NEXT_LOCALE',
    country: 'T1_COUNTRY',
    format: 'T1_FORMAT',
    currency: 'T1_CURRENCY',
    digit: 'T1_DIGIT',
    accountId: 'T1_ACCOUNT_ID',
    accessToken: 'T1_ACCESS_TOKEN',
    idpAccessToken: 'T1_IDP_ACCESS_TOKEN',
    idpRefreshToken: 'T1_IDP_REFRESH_TOKEN',
    hourCycle: 'T1_HOUR_CYCLE',
    firstDayWeek: 'T1_FIRST_DAY_WEEK',
    firstWeekYear: 'T1_FIRST_WEEK_YEAR',
    timeZone: 'T1_TIME_ZONE',
  },
  options: {
    maxAge: 100 * 24 * 60 * 60,
  },
};

export default cookie;
