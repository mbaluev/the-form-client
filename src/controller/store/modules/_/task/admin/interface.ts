import type ITaskBaseStore from '@store/modules/_/task/base/interface';

export default interface ITaskAdminStore extends ITaskBaseStore {
  complete: () => Promise<void>;
}
