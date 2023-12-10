import moment from 'moment';

export const TODAY = {
  date: new Date(),
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  yearShort: new Date().getFullYear().toString().substring(2),
  subtract: (y?: number, m?: number, d?: number) => {
    return moment(new Date()).subtract(y, 'years').subtract(m, 'months').subtract(d, 'days');
  },
  subtractMonthToYear: (monthCount: number) => {
    return moment(new Date())
      .subtract(monthCount - 1, 'months')
      .year();
  },
  subtractMonthToMonth: (monthCount: number) => {
    return moment(new Date())
      .subtract(monthCount - 1, 'months')
      .month();
  },
  monthsDiff: (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
    const start = moment({
      year: startYear,
      month: startMonth,
    });
    const end = moment({
      year: endYear,
      month: endMonth,
    });
    return end.diff(start, 'months') + 1;
  },
};
