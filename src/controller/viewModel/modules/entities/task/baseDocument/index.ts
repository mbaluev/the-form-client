import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { ITaskUserDocumentDTO } from '@model/entities/task';
import { TaskService } from '@service/modules/entities/task';
import { action, makeObservable } from 'mobx';
import objectPath from 'object-path';
import { ITaskBaseDocumentViewModel } from '@viewModel/modules/entities/task/baseDocument/interface';

@injectable()
export class TaskBaseDocumentViewModel
  extends BaseCardViewModel<ITaskUserDocumentDTO>
  implements ITaskBaseDocumentViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: TaskService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected modelAuth!: AuthViewModel;

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
            const docType = objectPath.get(
              this.modalData,
              'document.documentType.name'
            );
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
            const docType = objectPath.get(
              this.modalData,
              'document.documentType.name'
            );
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
      const token = await this.modelAuth.verify();
      return await this.serviceFile.uploadFile(file, token);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  download = async (id: string, filename: string) => {
    try {
      const token = await this.modelAuth.verify();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };
}
