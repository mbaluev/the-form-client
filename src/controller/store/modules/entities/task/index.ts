/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import _ from 'lodash';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { ITaskDTO } from '@model/entities/task';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import type ITaskStore from '@store/modules/entities/task/interface';
import type IBlockStore from '@store/modules/entities/block/interface';
import type ITaskService from '@service/modules/entities/task/interface';
import type IFileService from '@service/modules/common/file/interface';

@injectable()
export class TaskStore extends BaseCardStore<ITaskDTO> implements ITaskStore {
  @inject(SERVICE.Task) protected serviceTask!: ITaskService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

  @inject(STORE.Block) protected blockStore!: IBlockStore;

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
            (item.document?.name !== undefined &&
              item.document?.name !== null &&
              item.document?.name.toLowerCase().includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document?.description !== undefined &&
              item.document?.description !== null &&
              item.document?.description
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
      if (this.blockStore.data) {
        const data = await this.serviceTask.getTasks({
          blockId: this.blockStore.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalLoading(true);
    try {
      const data = await this.serviceTask.getTask(id, query);
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
        this.changeModalField('blockId', this.blockStore.data?.id);
        const data = await this.serviceTask.saveTask(this.modalData);
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
        await this.serviceTask.deleteTasks(this.deleteIds);
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
