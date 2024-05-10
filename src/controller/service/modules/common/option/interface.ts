import { ISelectItem } from '@components/fields/selectField/types';

interface IOptionService {
  getDocumentTypes: () => Promise<ISelectItem[] | undefined>;
}

export default IOptionService;
