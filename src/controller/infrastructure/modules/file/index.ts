import { inject, injectable } from 'inversify';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IFileApiModule } from '@infrastructure/modules/file/interface';

@injectable()
export class FileApiModule implements IFileApiModule {
  @inject(VIEW_MODEL.Notify) private notify!: INotifyViewModel;

  async fetch(url: string) {
    try {
      const response = await fetch(url);
      if (response.body) {
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(result.value);
      }
    } catch (error: any) {
      const message = this.notify.parseError(error);
      this.notify.add('error', message);
      return Promise.reject(error);
    }
  }

  async get(url: string) {
    return this.fetch(url);
  }
}
