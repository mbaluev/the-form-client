import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { ITaskDTO } from '@model/entities/task';
import type ITaskSettingsItemStore from '@store/modules/settings/task/item/interface';
import type ITaskService from '@service/modules/entities/task/interface';
import type ITaskSettingsListStore from '@store/modules/settings/task/list/interface';

@injectable()
export class TaskSettingsItemStore
  extends BaseCardStore<ITaskDTO>
  implements ITaskSettingsItemStore
{
  @inject(SERVICE.Task) private taskService!: ITaskService;

  @inject(STORE.TaskSettingsList) private materialListStore!: ITaskSettingsListStore;

  // --- override

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalData();
    this.setModalLoading(true);
    try {
      const data = await this.taskService.getTask(id, query);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async (data?: ITaskDTO) => {
    if (data) {
      this.setSaveLoading(true);
      try {
        const res = await this.taskService.saveTask(data);
        await this.materialListStore.getData({ blockId: data.blockId });
        return res;
      } catch (err) {
      } finally {
        this.setSaveLoading(false);
      }
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    if (this.deleteIds) {
      this.setDeleteLoading(true);
      try {
        await this.taskService.deleteTasks(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      } catch (err) {
        return false;
      } finally {
        this.setDeleteLoading(false);
      }
    }
  };
}
