/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { BlockViewModel } from '@viewModel/modules/entities/block';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { ITaskViewModel } from '@viewModel/modules/entities/task/interface';
import { ITaskDTO } from '@model/entities/task';
import { TaskService } from '@service/modules/entities/task';

@injectable()
export class TaskViewModel
  extends BaseCardViewModel<ITaskDTO>
  implements ITaskViewModel
{
  @inject(SERVICE.Task) protected serviceTask!: TaskService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Block) protected block!: BlockViewModel;

  constructor() {
    super();
    this.setValidations([
      {
        nameSpace: 'document.documentTypeId',
        type: 'required',
        message: 'Required',
      },
      { nameSpace: 'document.name', type: 'required', message: 'Required' },
    ]);
  }

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: ITaskDTO): boolean => {
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
      } else {
        result = true;
      }
      return result;
    };

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceTask.getTasks(
          { blockId: this.block.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id: string) => {
    this.setModalLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceTask.getTask(id, undefined, token);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        this.changeModalField('blockId', this.block.data?.id);
        const token = await this.auth.refreshToken();
        const data = await this.serviceTask.saveTask(this.modalData, token);
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        const token = await this.auth.refreshToken();
        await this.serviceTask.deleteTasks(this.deleteIds, token);
        await this.getList();
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
