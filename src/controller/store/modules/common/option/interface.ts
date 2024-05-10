import IBaseStore from '@store/modules/base/store/interface';
import { ISelectItem } from '@components/fields/selectField/types';

export default interface IOptionStore extends IBaseStore {
  documentTypes?: ISelectItem[];
  getDocumentTypes: () => Promise<ISelectItem[] | undefined>;
}
