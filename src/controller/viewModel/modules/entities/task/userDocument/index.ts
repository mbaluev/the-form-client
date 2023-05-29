/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { ITaskUserDocumentDTO } from '@model/entities/task';
import { TaskService } from '@service/modules/entities/task';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';
import { action, makeObservable } from 'mobx';
import objectPath from 'object-path';
import { TaskUserViewModel } from '@viewModel/modules/entities/task/user';

@injectable()
export class TaskUserDocumentViewModel
  extends BaseCardViewModel<ITaskUserDocumentDTO>
  implements ITaskUserDocumentViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: TaskService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected modelAuth!: AuthViewModel;

  @inject(VIEW_MODEL.TaskUser) protected modelUserTask!: TaskUserViewModel;

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
      { nameSpace: 'document.name', type: 'required', message: 'Required' },
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

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: ITaskUserDocumentDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'document.name')) {
          result =
            result ||
            (item.document.name !== undefined &&
              item.document.name !== null &&
              item.document.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document.description !== undefined &&
              item.document.description !== null &&
              item.document.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.file.name')) {
          result =
            result ||
            (item.document.file.name !== undefined &&
              item.document.file.name !== null &&
              item.document.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.url')) {
          result =
            result ||
            (item.document.url !== undefined &&
              item.document.url !== null &&
              item.document.url
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const token = await this.modelAuth.refreshToken();
        const data = await this.serviceTask.sentTaskUser(this.modalData, token);
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  // -- other

  upload = async (file: File) => {
    this.setDataLoading(true);
    try {
      const token = await this.modelAuth.refreshToken();
      return await this.serviceFile.uploadFile(file, token);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  download = async (id: string, filename: string) => {
    try {
      const token = await this.modelAuth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };
}
