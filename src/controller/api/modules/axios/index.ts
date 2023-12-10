import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '@api/const';
import { STORE } from '@store/ids';
import type IAxiosApi from '@api/modules/axios/interface';
import type { IApiOptions } from '@api/modules/axios/interface';
import type INotifyStore from '@store/modules/common/notify/interface';

@injectable()
export class AxiosApi implements IAxiosApi {
  @inject(STORE.Notify) private notifyStore!: INotifyStore;

  readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create();
  }

  init(getToken?: Promise<string>, baseUrl?: string) {
    this.api.interceptors.request.use(
      async (config) => {
        this.notifyStore.clear();
        const token = getToken ? await getToken : undefined;
        config.headers.Authorization = token ? `Bearer ${token}` : undefined;
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.api.interceptors.response.use(
      async (response) => {
        const responseData = response.data;
        const result = JSON.parse(responseData);
        const isError = result.isActionSuccessful === false;
        if (isError) this.notifyStore.add(result.details);
        return response;
      },
      (error) => {
        let err = error;
        if (error.response) err = JSON.parse(error.response.data);
        if (err) this.notifyStore.add(err);
        return Promise.reject(error);
      }
    );
    this.api.defaults.baseURL = baseUrl;
    this.api.defaults.transformResponse = (data) => data;
  }

  async fetch(config: AxiosRequestConfig<any>, options?: IApiOptions) {
    try {
      config.headers = options?.headers;
      const response = await this.api(config);
      return await this.handleError(response.data);
    } catch (error: any) {
      let ignore: boolean;
      if (typeof options?.ignoreError === 'boolean')
        ignore = options?.ignoreError;
      else ignore = options?.ignoreError?.code === error?.response?.status;
      ignore = ignore || error?.response?.status === 401;
      if (!ignore) this.notifyStore.add(error, 'error');
      return Promise.reject(error);
    }
  }

  async get(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.GET,
        url: url,
        data: data,
      },
      options
    );
  }

  async getBlob(url: string, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.GET,
        url: url,
        responseType: 'blob',
      },
      options
    );
  }

  async getDownload(url: string, filename: string, options?: IApiOptions) {
    return this.getBlob(url, options).then((response) => {
      if (response) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(response);
        a.setAttribute('download', filename);
        a.click();
      }
    });
  }

  async post(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.POST,
        url: url,
        data: data,
      },
      options
    );
  }

  async postBlob(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.POST,
        url: url,
        data: data,
        responseType: 'blob',
      },
      options
    );
  }

  async postDownload(
    url: string,
    filename: string,
    data?: any,
    options?: IApiOptions
  ) {
    return this.postBlob(url, data, options).then((response) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(response);
      a.setAttribute('download', filename);
      a.click();
    });
  }

  async put(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.PUT,
        url: url,
        data: data,
      },
      options
    );
  }

  async delete(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.DELETE,
        url: url,
        data: data,
      },
      options
    );
  }

  async patch(url: string, data?: any, options?: IApiOptions) {
    return this.fetch(
      {
        method: HttpMethod.PATCH,
        url: url,
        data: data,
      },
      options
    );
  }

  // handle error

  handleError = async (data: any) => {
    if (data.message) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  };
}
