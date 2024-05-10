import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { action, makeObservable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { IFileDTO } from '@model/common/file';
import type IFileStore from '@store/modules/common/file/interface';
import type IFileService from '@service/modules/common/file/interface';
import type INotifyStore from '@store/modules/common/notify/interface';

@injectable()
export class FileStore extends BaseStore implements IFileStore {
  @inject(SERVICE.File) protected fileService!: IFileService;

  @inject(STORE.Notify) protected notifyStore!: INotifyStore;

  constructor() {
    super();
    makeObservable(this, {
      upload: action,
      download: action,
    });
  }

  upload = async (file: File) => {
    this.setLoading(true);
    this.setError();
    try {
      return await this.fileService.uploadFile(file);
    } catch (err) {
      this.setError(this.notifyStore.parseError(err));
    } finally {
      this.setLoading(false);
    }
  };

  download = async (file: IFileDTO) => {
    this.setError();
    try {
      await this.fileService.downloadFile(file.id, file.name);
    } catch (err) {
      this.setError(this.notifyStore.parseError(err));
    } finally {
    }
  };
}
