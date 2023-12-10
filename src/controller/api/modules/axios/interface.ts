export default interface IAxiosApi {
  get: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  getBlob: <T>(url: string, options?: IApiOptions) => Promise<T>;

  post: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  postBlob: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;

  put: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  delete: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;
  patch: <T>(url: string, data?: any, options?: IApiOptions) => Promise<T>;

  download: (url: string, name: string, options?: IApiOptions) => Promise<void>;
}

export interface IApiOptions {
  headers?: Record<any, any>;
}
