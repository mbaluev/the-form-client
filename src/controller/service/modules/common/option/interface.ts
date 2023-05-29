import { ISelectItem } from '@components/fields';

export interface IOptionService {
  getDocumentTypes: (
    token?: string | null
  ) => Promise<ISelectItem[] | undefined>;
}
