import type { NextRouter } from 'next/router';

export default interface IFilterStore {
  // router
  router?: NextRouter;
  setRouter: (value?: NextRouter) => void;
  changeRoute: (value?: NextRouter) => void;

  // filters
  filters: Record<string, any>;
  hasFilters: boolean;
  clearFilters: () => void;
  setFilter: (key: string, value?: any) => void;
}
