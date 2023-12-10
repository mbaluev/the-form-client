import { action, computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import type IFilterStore from '@store/modules/common/filter/interfaces';
import type { NextRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import {
  DistinctValueResult,
  FilterConnector,
  FilterItem,
  FilterOperator,
} from '@service/modules/client/api';

@injectable()
export class FilterStore implements IFilterStore {
  constructor() {
    makeObservable(this, {
      // router
      init: action,
      router: observable,
      setRouter: action,
      changeRoute: action,

      // slugs
      slugs: observable,
      setSlugs: action,
      hasSlugs: computed,

      // params
      params: observable,
      setParams: action,
      hasParams: computed,
      clearParams: action,
      setParam: action,
      setParamObj: action,

      // filters
      filters: observable,
      setFilters: action,
      hasFilters: computed,
      clearFilters: action,
      setFilter: action,

      // operators
      operators: observable,
      setOperators: action,
      hasOperators: computed,
      clearOperators: action,
      setOperator: action,
      getOperator: action,

      // ui
      isMore: observable,
      setIsMore: action,
      getFilterItems: action,
      getFilterDistinctValues: action,
    });
  }

  // router

  init = () => {
    this.initSlugs();
    this.initFilters();
    this.initOperators();
    this.initParams();
  };

  router?: NextRouter = undefined;

  setRouter = (value?: NextRouter) => (this.router = value);

  changeRoute = (value?: NextRouter) => {
    const same = JSON.stringify(value) === JSON.stringify(this.router);
    this.setRouter(value);
    if (!same) this.init();
  };

  // slugs

  slugs: Record<string, any> = {};

  setSlugs = (value: Record<string, any>) => (this.slugs = value);

  initSlugs = () => {
    const slugs = this.slugsFromQuery();
    this.setSlugs(slugs);
  };

  slugsFromQuery = () => {
    const pathname = this.router?.pathname;
    const query = this.router?.query;
    const parts: Record<string, any> = {};
    if (pathname) {
      const regexp = /\[.*?\]/gm;
      const matches = regexp.exec(pathname);
      matches?.forEach((match) => {
        const key = match.slice(1, -1).replace('...', '');
        parts[key] = query?.[key];
      });
    }
    return parts;
  };

  slugsToQuery = (slugs: Record<string, any>) => {
    return JSON.parse(JSON.stringify(slugs));
  };

  get hasSlugs() {
    return Object.keys(this.slugs).length > 0;
  }

  setSlug = (key: string, value?: any) => {
    const slugs = this.setPartsValue(this.slugs, key, value);
    const params = this.setPartsValue(this.params);
    const filters = this.setPartsValue(this.filters);
    const operators = this.setPartsValue(this.operators);
    this.updateRoute(slugs, params, filters, operators);
  };

  // params

  params: Record<string, any> = {};

  setParams = (value: Record<string, any>) => (this.params = value);

  initParams = () => {
    const params = this.paramsFromQuery();
    this.setParams(params);
  };

  paramsFromQuery = () => {
    const query = this.router?.query ? { ...this.router.query } : {};
    const params: Record<string, any> = {};
    for (const key in query) {
      if (
        Object.keys(this.slugs).indexOf(key) < 0 &&
        Object.keys(this.filters).indexOf(key.replace('f_', '')) < 0 &&
        Object.keys(this.operators).indexOf(key.replace('o_', '')) < 0
      ) {
        // if (this.isArrayString(query[key] as string)) {
        //   params[key] = this.arrayFromString(query[key] as string);
        // } else {
        params[key] = query[key];
        // }
      }
    }
    return params;
  };

  paramsToQuery = (params: Record<string, any>) => {
    return JSON.parse(JSON.stringify(params));
  };

  get hasParams() {
    return Object.keys(this.params).length > 0;
  }

  clearParams = () => {
    const slugs = this.setPartsValue(this.slugs);
    const params = {};
    const filters = this.setPartsValue(this.filters);
    const operators = this.setPartsValue(this.operators);
    this.updateRoute(slugs, params, filters, operators);
  };

  setParam = (key: string, value?: any) => {
    const slugs = this.setPartsValue(this.slugs);
    const params = this.setPartsValue(this.params, key, value);
    const filters = this.setPartsValue(this.filters);
    const operators = this.setPartsValue(this.operators);
    this.updateRoute(slugs, params, filters, operators);
  };

  setParamObj = (obj: Record<string, any>) => {
    const slugs = this.setPartsValue(this.slugs);
    const filters = this.setPartsValue(this.filters);
    let params = JSON.parse(JSON.stringify(this.params));
    Object.keys(obj).forEach((key) => {
      params = this.setPartsValue(params, key, obj[key]);
    });
    const operators = this.setPartsValue(this.operators);
    this.updateRoute(slugs, params, filters, operators);
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
    const prefix = 'f_';
    const query = this.router?.query ? { ...this.router.query } : {};
    const filters: Record<string, any> = {};
    for (const key in query) {
      if (key.indexOf(prefix) === 0) {
        // if (this.isArrayString(query[key] as string)) {
        //   filters[key.replace(prefix, '')] = this.arrayFromString(query[key] as string);
        // } else {
        filters[key.replace(prefix, '')] = query[key];
        // }
      }
    }
    return filters;
  };

  filtersToQuery = (filters: Record<string, any>) => {
    const prefix = 'f_';
    const query: ParsedUrlQuery = {};
    for (const key in filters) {
      if (filters[key] || filters[key] === 0) {
        query[`${prefix}${key}`] = filters[key]; // `${filters[key]}`;
      }
    }
    return query;
  };

  get hasFilters() {
    return Object.keys(this.filters).length > 0;
  }

  clearFilters = () => {
    const slugs = this.setPartsValue(this.slugs);
    const params = this.setPartsValue(this.params);
    const filters = {};
    const operators = {};
    this.updateRoute(slugs, params, filters, operators);
  };

  setFilter = (key: string, value?: any, operator?: any) => {
    const slugs = this.setPartsValue(this.slugs);
    const params = this.setPartsValue(this.params);
    const filters = this.setPartsValue(this.filters, key, value);
    const operators = this.setPartsValue(this.operators, key, operator);
    this.updateRoute(slugs, params, filters, operators);
  };

  // filters

  operators: Record<string, any> = {};

  setOperators = (value: Record<string, any>) => (this.operators = value);

  initOperators = () => {
    const operators = this.operatorsFromQuery();
    const operatorsNewString = JSON.stringify(operators);
    const operatorsOldString = JSON.stringify(this.operators);
    if (operatorsNewString !== operatorsOldString) this.setOperators(operators);
  };

  operatorsFromQuery = () => {
    const prefix = 'o_';
    const query = this.router?.query ? { ...this.router.query } : {};
    const operators: Record<string, any> = {};
    for (const key in query) {
      if (key.indexOf(prefix) === 0) {
        operators[key.replace(prefix, '')] = query[key];
      }
    }
    return operators;
  };

  operatorsToQuery = (operators: Record<string, any>) => {
    const prefix = 'o_';
    const query: ParsedUrlQuery = {};
    for (const key in operators) {
      if (operators[key] || operators[key] === 0) {
        query[`${prefix}${key}`] = operators[key];
      }
    }
    return query;
  };

  get hasOperators() {
    return Object.keys(this.operators).length > 0;
  }

  clearOperators = () => {
    const slugs = this.setPartsValue(this.slugs);
    const params = this.setPartsValue(this.params);
    const filters = this.setPartsValue(this.filters);
    const operators = {};
    this.updateRoute(slugs, params, filters, operators);
  };

  setOperator = (key: string, value?: any) => {
    const slugs = this.setPartsValue(this.slugs);
    const params = this.setPartsValue(this.params);
    const filters = this.setPartsValue(this.filters);
    const operators = this.setPartsValue(this.operators, key, value);
    this.updateRoute(slugs, params, filters, operators);
  };

  getOperator = (key?: string) => {
    const defaultOperator = FilterOperator.In;
    if (this.operators && key) return this.operators[key] || defaultOperator;
    return defaultOperator;
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

  updateRoute = (
    slugs: Record<string, any>,
    params: Record<string, any>,
    filters: Record<string, any>,
    operators: Record<string, any>
  ) => {
    if (this.router) {
      const pathname = this.router.pathname;
      const querySlugs = this.slugsToQuery(slugs);
      const queryParams = this.paramsToQuery(params);
      const queryFilters = this.filtersToQuery(filters);
      const queryOperators = this.operatorsToQuery(operators);
      const query = {
        ...querySlugs,
        ...queryParams,
        ...queryFilters,
        ...queryOperators,
      };
      // const queryAs = { ...queryParams, ...queryFilters };
      // const as = this.asPath(pathname, queryAs);
      const as = undefined;
      const options = { shallow: true };
      this.router.replace({ pathname, query }, as, options);
    }
  };

  asPath = (pathname: string, query?: ParsedUrlQuery) => {
    let url = '';
    for (const key in query) url += `${key}=${query[key]}&`;
    url = url.substring(0, url.length - 1).replace(/ /g, '+');
    return url ? `${pathname}?${url}` : pathname;
  };

  isArrayString = (value: string) => {
    const regexp = /.+(,.+)+/gm;
    return regexp.test(value);
  };

  arrayFromString = (value: string) => {
    return value.split(',');
  };

  // ui

  isMore?: boolean = undefined;

  setIsMore = (value?: boolean) => {
    this.isMore = value;
  };

  getFilterItems = (except?: string, property?: string, value?: any[]) => {
    let filterItems: FilterItem[] | undefined = undefined;
    for (const key in this.filters) {
      if (key !== except && key !== property) {
        const filterItem = this.getFilterItem(key, this.filters[key]);
        if (!filterItems) filterItems = [];
        filterItems.push(filterItem);
      }
    }
    if (property) {
      const filterItem = this.getFilterItem(property, value);
      if (!filterItems) filterItems = [];
      filterItems.push(filterItem);
    }
    return filterItems;
  };

  getFilterItem = (property: string, value?: any[]) => {
    const operator = this.getOperator(property);
    const val =
      operator === FilterOperator.In
        ? Array.isArray(value)
          ? value
          : [value]
        : value;
    return {
      connector: FilterConnector.And,
      negateExpression: false,
      condition: {
        property: property,
        operator,
        value: val,
      },
      subFilters: undefined,
    };
  };

  getFilterDistinctValues = (name: string, data: DistinctValueResult) => {
    const item = data.propertyResults?.[name] || {};
    return Object.keys(item).map((key) => ({
      value: key,
      label: key,
      count: item[key],
    }));
  };
}
