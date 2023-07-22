import { ITaskBaseViewModel } from '@viewModel/modules/entities/task/base/interface';

export interface ITaskAdminViewModel extends ITaskBaseViewModel {
  complete: () => Promise<void>;
}
