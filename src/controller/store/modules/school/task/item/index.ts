import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { ITaskUserDTO } from '@model/entities/task';
import type ITaskSchoolItemStore from '@store/modules/school/task/item/interface';
import type ITaskService from '@service/modules/entities/task/interface';

@injectable()
export class TaskSchoolItemStore
  extends BaseCardStore<ITaskUserDTO>
  implements ITaskSchoolItemStore
{
  @inject(SERVICE.Task) private taskService!: ITaskService;

  // --- override

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.taskService.getTaskUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
