import { Params } from '@model/route';
import { NextRouter } from 'next/router';

export interface IFilterViewModel {
  filters: Params;
  defaultFilters?: Params;

  hasFilters: boolean;
  isDefaults: boolean;

  setFilter: (key: string, value: any, router?: NextRouter) => void;
  loadFilters: (router: NextRouter) => void;
  resetFilters: (router: NextRouter) => void;

  setDefaults: (value?: Params) => void;
  resetDefaults: () => void;
}
