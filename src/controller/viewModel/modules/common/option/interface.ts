import { IBaseViewModel } from '@viewModel/modules/base/base/interface';
import { ISelectItem } from '@components/fields';

export interface IOptionViewModel extends IBaseViewModel {
  getDocumentTypes: () => Promise<ISelectItem[] | undefined>;
}
