import { action, computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import type IFilterStore from '@store/modules/common/filter/interfaces';
import type { NextRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';

@injectable()
export class FilterStore implements IFilterStore {
  constructor() {
    makeObservable(this, {
      // router
      init: action,
      router: observable,
      setRouter: action,
      changeRoute: action,

      // filters
      filters: observable,
      setFilters: action,
      hasFilters: computed,
      clearFilters: action,
      setFilter: action,
    });
  }

  // router

  init = () => {
    this.initFilters();
  };

  router?: NextRouter = undefined;

  setRouter = (value?: NextRouter) => (this.router = value);

  changeRoute = (value?: NextRouter) => {
    const same = JSON.stringify(value) === JSON.stringify(this.router);
    this.setRouter(value);
    if (!same) this.init();
  };

  // filters

  filters: Record<string, any> = {};

  setFilters = (value: Record<string, any>) => (this.filters = value);

  initFilters = () => {
    const filters = this.filtersFromQuery();
    const filtersNewString = JSON.stringify(filters);
    const filtersOldString = JSON.stringify(this.filters);
    if (filtersNewString !== filtersOldString) this.setFilters(filters);
  };

  filtersFromQuery = () => {
    const prefix = '';
    const query = this.router?.query ? { ...this.router.query } : {};
    const filters: Record<string, any> = {};
    for (const key in query) {
      if (key.indexOf(prefix) === 0) {
        filters[key.replace(prefix, '')] = query[key];
      }
    }
    return filters;
  };

  filtersToQuery = (filters: Record<string, any>) => {
    const prefix = '';
    const query: ParsedUrlQuery = {};
    for (const key in filters) {
      if (filters[key] || filters[key] === 0) {
        query[`${prefix}${key}`] = filters[key];
      }
    }
    return query;
  };

  get hasFilters() {
    return Object.keys(this.filters).length > 0;
  }

  clearFilters = () => {
    const filters = {};
    this.updateRoute(filters);
  };

  setFilter = (key: string, value?: any) => {
    const filters = this.setPartsValue(this.filters, key, value);
    this.updateRoute(filters);
  };

  // helpers

  setPartsValue = (parts: Record<string, any>, key?: string, value?: any) => {
    const newParts = JSON.parse(JSON.stringify(parts));
    if (key) {
      const isValue =
        (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value !== undefined) ||
        (Number.isInteger(value) && value === 0);

      if (isValue) newParts[key] = value;
      else delete newParts[key];
    }
    return newParts;
  };

  updateRoute = (filters: Record<string, any>) => {
    if (this.router) {
      const pathname = this.router.pathname;
      const queryFilters = this.filtersToQuery(filters);
      const query = { ...queryFilters };
      const as = undefined;
      const options = { shallow: true };
      this.router.replace({ pathname, query }, as, options);
    }
  };
}
