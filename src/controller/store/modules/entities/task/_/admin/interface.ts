import type ITaskBaseStore from '@store/modules/entities/task/_/base/interface';

export default interface ITaskAdminStore extends ITaskBaseStore {
  complete: () => Promise<void>;
}
