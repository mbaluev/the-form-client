import type IBaseStore from '@store/modules/base/store/interface';
import { ICompanyRegisterDTO } from '@model/onboard/company';
import { BusinessPartnerDomainVerificationResponse } from '@service/modules/client/api';

export default interface ICompanyRegisterStore extends IBaseStore {
  register: (data: ICompanyRegisterDTO) => Promise<void>;
  validateDomain: (
    domain: string
  ) => Promise<BusinessPartnerDomainVerificationResponse | undefined>;
}
