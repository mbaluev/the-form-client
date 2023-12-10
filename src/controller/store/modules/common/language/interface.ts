import type { ILanguageItem } from '@model/common/language';
import type IBaseStore from '@store/modules/base/store/interface';

export default interface ILanguageStore extends IBaseStore {
  languages?: ILanguageItem[];
  init: () => Promise<void>;
}
