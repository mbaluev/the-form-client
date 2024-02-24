import type ITaskBaseStore from '@store/modules/settings/task/_/base/interface';

export default interface ITaskAdminStore extends ITaskBaseStore {
  complete: () => Promise<void>;
}
