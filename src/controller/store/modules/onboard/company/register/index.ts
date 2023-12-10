import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseStore } from '@store/modules/base/store';
import { ICompanyRegisterDTO } from '@model/onboard/company';
import {
  BusinessPartnerDomainVerificationRequest,
  TenantBusinessPartnerCreationRequest,
} from '@service/modules/client/api';
import type IClientService from '@service/modules/client/interface';
import type ICompanyRegisterStore from '@store/modules/onboard/company/register/interface';

@injectable()
export class CompanyRegisterStore
  extends BaseStore
  implements ICompanyRegisterStore
{
  @inject(SERVICE.Client) protected clientService!: IClientService;

  constructor() {
    super();
    makeObservable(this, {
      register: action,
      validateDomain: action,
    });
  }

  register = async (data: ICompanyRegisterDTO) => {
    this.setLoading(true);
    try {
      const req = data as TenantBusinessPartnerCreationRequest;
      await this.clientService.TenantBusinessPartners.registerTenantBusinessPartner(
        req
      );
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  validateDomain = async (domain: string) => {
    try {
      const req: BusinessPartnerDomainVerificationRequest = { domain };
      return await this.clientService.TenantBusinessPartners.verifyDomain(req);
    } catch (err) {
    } finally {
    }
  };
}
