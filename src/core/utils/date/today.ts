import moment from 'moment';

const year = new Date().getFullYear();
const month = new Date().getMonth();
const monthPrevDate = moment(new Date()).subtract(1, 'months');

export const TODAY = {
  date: new Date(),
  year,
  yearShort: year.toString().substring(2),
  yearFull: monthPrevDate.year(),
  month,
  monthFull: monthPrevDate.month(),
  yearSubtract: (monthCount: number) => {
    return moment(new Date()).subtract(monthCount, 'months').year();
  },
  monthSubtract: (monthCount: number) => {
    return moment(new Date()).subtract(monthCount, 'months').month();
  },
  yearMonthDiff: (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
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
