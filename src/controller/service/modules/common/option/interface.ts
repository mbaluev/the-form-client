import { ISelectItem } from '@components/fields';

export interface IOptionService {
  getDocumentTypes: () => Promise<ISelectItem[] | undefined>;
}
