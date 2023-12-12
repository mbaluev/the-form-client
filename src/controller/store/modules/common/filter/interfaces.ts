import type { NextRouter } from 'next/router';

export default interface IFilterStore {
  // router
  router?: NextRouter;
  setRouter: (value?: NextRouter) => void;
  changeRoute: (value?: NextRouter) => void;

  // slugs
  slugs: Record<string, any>;
  hasSlugs: boolean;
  setSlug: (key: string, value?: any) => void;

  // params
  params: Record<string, any>;
  hasParams: boolean;
  clearParams: () => void;
  setParam: (key: string, value?: any) => void;
  setParamObj: (obj: Record<string, any>) => void;

  // filters
  filters: Record<string, any>;
  hasFilters: boolean;
  clearFilters: () => void;
  setFilter: (key: string, value?: any) => void;
}
