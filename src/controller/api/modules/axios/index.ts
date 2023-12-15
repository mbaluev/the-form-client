import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '@api/const';
import { STORE } from '@store/ids';
import type IAxiosApi from '@api/modules/axios/interface';
import type { IApiOptions } from '@api/modules/axios/interface';
import type INotifyStore from '@store/modules/common/notify/interface';
import { getCookie } from 'cookies-next';
import cookie from '@utils/cookie';

@injectable()
export class AxiosApi implements IAxiosApi {
  @inject(STORE.Notify) private notifyStore!: INotifyStore;

  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      withCredentials: true,
      baseURL: process.env.REACT_APP_CORE_URL,
    });
    this.api.interceptors.request.use(
      async (config) => {
        const token = getCookie(cookie.names.token) || undefined;
        config.headers.Authorization = token ? `Bearer ${token}` : undefined;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async fetch(config: AxiosRequestConfig<any>, options?: IApiOptions) {
    try {
      config.headers = options?.headers;
      const response = await this.api(config);
      return response.data;
    } catch (error: any) {
      this.notifyStore.add(error, 'error');
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

  async download(url: string, name: string, options?: IApiOptions) {
    return this.getBlob(url, options).then((response) => {
      if (response) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(response);
        a.setAttribute('download', name);
        a.click();
      }
    });
  }
}
