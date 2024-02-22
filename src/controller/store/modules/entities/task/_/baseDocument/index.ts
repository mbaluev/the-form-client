import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ITaskUserDocumentDTO } from '@model/entities/task';
import { action, makeObservable } from 'mobx';
import objectPath from 'object-path';
import { BaseCardStore } from '@store/modules/base/card';
import type ITaskBaseDocumentStore from '@store/modules/entities/task/_/baseDocument/interface';
import type ITaskService from '@service/modules/entities/task/interface';
import type IFileService from '@service/modules/common/file/interface';

@injectable()
export class TaskBaseDocumentStore
  extends BaseCardStore<ITaskUserDocumentDTO>
  implements ITaskBaseDocumentStore
{
  @inject(SERVICE.Task) protected serviceTask!: ITaskService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

  constructor() {
    super();
    makeObservable(this, {
      upload: action,
      download: action,
    });
    this.setValidations([
      {
        nameSpace: 'document.documentTypeId',
        type: 'required',
        message: 'Required',
      },
      {
        nameSpace: 'document.name',
        type: 'required',
        message: 'Required',
      },
      {
        nameSpace: 'document.description',
        type: 'required',
        message: 'Required',
      },
      {
        nameSpace: 'document.fileId',
        type: 'required',
        message: 'Required',
        condition: () => {
          if (this.modalData) {
            const docType = objectPath.get(this.modalData, 'document.documentType.name');
            return docType === 'file';
          }
          return false;
        },
      },
      {
        nameSpace: 'document.url',
        type: 'required',
        message: 'Required',
        condition: () => {
          if (this.modalData) {
            const docType = objectPath.get(this.modalData, 'document.documentType.name');
            return docType === 'link' || docType === 'video';
          }
          return false;
        },
      },
      {
        nameSpace: 'document.url',
        type: 'link',
        message: 'Incorrect url',
      },
    ]);
  }

  // --- actions

  upload = async (file: File) => {
    this.setDataLoading(true);
    try {
      return await this.serviceFile.uploadFile(file);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  download = async (id: string, filename: string) => {
    try {
      await this.serviceFile.downloadFile(id, filename);
    } catch (err) {
    } finally {
    }
  };
}
