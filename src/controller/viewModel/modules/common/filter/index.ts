import { action, computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { Params } from '@model/common/route';
import { IFilterViewModel } from '@viewModel/modules/common/filter/interfaces';
import { NextRouter } from 'next/router';
import _ from 'lodash';

@injectable()
export class FilterViewModel implements IFilterViewModel {
  constructor() {
    makeObservable(this, {
      filters: observable,
      defaultFilters: observable,

      setFilters: action,
      setDefaultFilters: action,

      hasFilters: computed,
      isDefaults: computed,
    });
  }

  replaceRoute = true;

  // --- observable

  filters: Params = {};

  defaultFilters?: Params = undefined;

  // --- actions

  setFilters = (value: Params) => {
    this.filters = value;
  };

  setDefaultFilters = (value?: Params) => {
    this.defaultFilters = value;
  };

  // --- computed

  get hasFilters() {
    return Object.keys(this.filters).length > 0;
  }

  get isDefaults() {
    return _.isEqual(this.defaultFilters, this.filters);
  }

  // --- session storage
  //
  // setSStorage = (url?: string) => {
  //   if (url) {
  //     SStorage.filters = { ...SStorage.filters, [url]: this.filters };
  //   }
  // };
  //
  // getSStorage = (url?: string) => {
  //   if (url && SStorage.filters) {
  //     return this.parseQuery(SStorage.filters[url]);
  //   }
  //   return null;
  // };

  // --- query helpers

  isArrayString = (value: string) => {
    const regexp = /\[.+(,.+)*]/gm;
    return regexp.test(value);
  };

  getArrayFromString = (value: string) => {
    const regexp = /\[(.+(,.+)*)]/gm;
    return regexp.exec(value)?.[1].split(',');
  };

  parseQuery = (filters: Params) => {
    const newFilters = { ...filters };
    for (const key in newFilters) {
      if (this.isArrayString(newFilters[key])) {
        newFilters[key] = this.getArrayFromString(newFilters[key]);
      }
    }
    return newFilters;
  };

  getQuery = (filters: Params) => {
    const query: Params = {};
    for (const key in filters) {
      if (filters[key] || filters[key] === 0) {
        if (Array.isArray(filters[key])) {
          query[key] = `[${filters[key]}]`;
        } else {
          query[key] = `${filters[key]}`;
        }
      }
    }
    return query;
  };

  // --- filter helpers

  setValue = (filters: Params, key: string, value?: any) => {
    if (
      (Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && value) ||
      (Number.isInteger(value) && value === 0)
    ) {
      filters[key] = value;
    } else {
      delete filters[key];
    }
    return filters;
  };

  setRoute = (router: NextRouter, filters: Params) => {
    const pathname = router.pathname;
    const query = this.getQuery(filters);
    router.replace({ pathname, query });
  };

  // --- actions

  setFilter = (key: string, value?: any, router?: NextRouter) => {
    const filters = { ...this.filters };
    this.setValue(filters, key, value);
    this.setFilters(filters);
    if (router && this.replaceRoute) {
      this.setRoute(router, filters);
    }
  };

  loadFilters = (router: NextRouter) => {
    let filters: Params;
    if (Object.keys(router.query).length > 0) {
      filters = this.parseQuery(router.query);
    } else {
      filters = { ...this.defaultFilters };
    }
    this.setFilters(filters);
  };

  resetFilters = (router: NextRouter) => {
    const filters = { ...this.defaultFilters };
    this.setFilters(filters);
    this.setRoute(router, {});
  };

  setDefaults = (value?: Params) => {
    this.setDefaultFilters(value);
  };

  resetDefaults = () => {
    this.setDefaultFilters();
  };
}
