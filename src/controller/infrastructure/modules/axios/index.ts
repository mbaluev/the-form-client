import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '@infrastructure/const';
import {
  IApiOptions,
  IAxiosApiModule,
} from '@infrastructure/modules/axios/interface';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { getCookie } from 'cookies-next';
import cookie from '@utils/cookie';

@injectable()
export class AxiosApiModule implements IAxiosApiModule {
  @inject(VIEW_MODEL.Notify) private notify!: INotifyViewModel;

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
      const message = this.notify.parseError(error);
      this.notify.add('error', message);
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

  async download(url: string, filename: string, options?: IApiOptions) {
    return this.getBlob(url, options).then((response) => {
      if (response) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(response);
        a.setAttribute('download', filename);
        a.click();
      }
    });
  }
}
