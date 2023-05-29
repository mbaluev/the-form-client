export interface ILocaleSample {
  date?: string;
  dateFormat?: string;
  time?: string;
  number?: string;
  currency?: string;
  currencyExplicit?: string;
}

export interface IToday {
  year: number;
  yearShort: string;
  month: number;
  monthName: string;
  monthNameShort: string;
}
