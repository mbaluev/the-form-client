import { IMaterialBaseViewModel } from '@viewModel/modules/entities/material/base/interface';

export interface IMaterialUserViewModel extends IMaterialBaseViewModel {
  update: (id: string, complete: boolean) => Promise<boolean>;
}
