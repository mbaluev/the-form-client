import type ITaskBaseStore from '@store/modules/entities/task/base/interface';

export default interface ITaskAdminStore extends ITaskBaseStore {
  complete: () => Promise<void>;
}
