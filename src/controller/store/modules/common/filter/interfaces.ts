import type { NextRouter } from 'next/router';
import { DistinctValueResult, FilterItem } from '@service/modules/client/api';
import { IFilterDTO } from '@model/common/filter';

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
  setFilter: (key: string, value?: any, operator?: any) => void;

  // operators
  operators: Record<string, any>;
  hasOperators: boolean;
  clearOperators: () => void;
  setOperator: (key: string, value?: any) => void;
  getOperator: (key?: string) => any;

  // ui
  isMore?: boolean;
  setIsMore: (value?: boolean) => void;
  getFilterItems: (except?: string, property?: string, value?: any[]) => FilterItem[] | undefined;
  getFilterDistinctValues: (name: string, data: DistinctValueResult) => IFilterDTO[] | undefined;
}
