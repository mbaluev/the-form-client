import { inject, injectable } from 'inversify';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IFetchApiModule } from '@infrastructure/modules/fetch/interface';
import { HttpMethod } from '@infrastructure/const';

@injectable()
export class FetchApiModule implements IFetchApiModule {
  @inject(VIEW_MODEL.Notify) private notify!: INotifyViewModel;

  async fetch(url: string, method: HttpMethod, data?: Record<any, any>) {
    const options: RequestInit = {
      method: method,
      body: JSON.stringify(data),
    };
    try {
      return await fetch(url, options);
    } catch (error) {
      const message = this.notify.parseError(error);
      this.notify.add('error', message);
      return Promise.reject(error);
    }
  }

  async get(url: string) {
    return this.fetch(url, HttpMethod.GET).then((response) => {
      return response.text();
    });
  }
}
