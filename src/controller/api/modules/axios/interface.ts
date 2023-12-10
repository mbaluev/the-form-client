import { AxiosInstance } from 'axios';

export interface IApiOptions {
  ignoreError?: boolean | { code: number };
  headers?: Record<any, any>;
}

export default interface IAxiosApi {
  api: AxiosInstance;
  init: (getToken?: Promise<string>, baseUrl?: string) => void;

  get: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  getBlob: <T>(url: string, options?: IApiOptions) => Promise<T>;
  getDownload: (
    url: string,
    filename: string,
    options?: IApiOptions
  ) => Promise<void>;

  post: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  postBlob: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  postDownload: (
    url: string,
    filename: string,
    data?: any,
    options?: IApiOptions
  ) => Promise<void>;

  put: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  delete: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  patch: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
}
