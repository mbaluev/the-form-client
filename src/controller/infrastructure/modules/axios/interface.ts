export interface IAxiosApiModule {
  get: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  getBlob: <T>(url: string, options?: IApiOptions) => Promise<T>;

  post: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  postBlob: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  postDownload: (url: string, filename: string, data?: any) => Promise<void>;

  put: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  delete: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  patch: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
}

export interface IApiOptions {
  ignoreError?: boolean;
  headers?: Record<any, any>;
}
