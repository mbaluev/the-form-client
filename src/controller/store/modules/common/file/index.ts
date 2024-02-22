import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { IFileDTO } from '@model/common/file';
import type IFileStore from '@store/modules/common/file/interface';
import type IFileService from '@service/modules/common/file/interface';

@injectable()
export class FileStore extends BaseStore implements IFileStore {
  @inject(SERVICE.File) protected serviceFile!: IFileService;

  constructor() {
    super();
    makeObservable(this, {
      upload: action,
      download: action,
    });
  }

  upload = async (file: File) => {
    this.setLoading(true);
    try {
      return await this.serviceFile.uploadFile(file);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  download = async (file: IFileDTO) => {
    try {
      await this.serviceFile.downloadFile(file.id, file.name);
    } catch (err) {
    } finally {
    }
  };
}
