import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '@infrastructure/const';
import {
  IApiOptions,
  IAxiosApiModule,
} from '@infrastructure/modules/axios/interface';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';

@injectable()
export class AxiosApiModule implements IAxiosApiModule {
  @inject(VIEW_MODEL.Notify) private notify!: INotifyViewModel;

  private readonly api: AxiosInstance;

  protected prefixUrl = process.env.REACT_APP_CORE_URL;

  constructor() {
    this.api = axios.create({
      withCredentials: true,
      baseURL: this.prefixUrl,
    });
  }

  async fetch(config: AxiosRequestConfig<any>, options?: IApiOptions) {
    try {
      config.headers = options?.headers;
      const response = await this.api(config);
      return response.data;
    } catch (error: any) {
      if (this.notify && !options?.ignoreError) {
        const message = this.notify.parseError(error);
        this.notify.add('error', message);
      }
      // return Promise.reject(error);
      return undefined;
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

  async getDownload(url: string, filename: string, data?: any) {
    return this.getBlob(url, data).then((response) => {
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

  async postDownload(url: string, filename: string, data?: any) {
    return this.postBlob(url, data).then((response) => {
      if (response) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(response);
        a.setAttribute('download', filename);
        a.click();
      }
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
}
