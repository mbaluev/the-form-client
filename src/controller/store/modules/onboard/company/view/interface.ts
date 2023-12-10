import type IBaseStore from '@store/modules/base/store/interface';
import { ICompanyViewDTO } from '@model/onboard/company';

export default interface ICompanyViewStore extends IBaseStore {
  company?: ICompanyViewDTO;
  setCompany: (value?: ICompanyViewDTO) => void;
  init: () => Promise<void>;

  // remove
  isRemoving: boolean;
  remove: () => Promise<void>;
}
