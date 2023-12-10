import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseStore } from '@store/modules/base/store';
import { ICompanyViewDTO } from '@model/onboard/company';
import type IClientService from '@service/modules/client/interface';
import type ICompanyViewStore from '@store/modules/onboard/company/view/interface';
import type IAuthStore from '@store/modules/common/auth/interface';

@injectable()
export class CompanyViewStore extends BaseStore implements ICompanyViewStore {
  @inject(SERVICE.Client) protected clientService!: IClientService;

  @inject(STORE.Auth) private authStore!: IAuthStore;

  constructor() {
    super();
    makeObservable(this, {
      company: observable,
      setCompany: action,
      init: action,

      // delete
      isRemoving: observable,
      setRemoving: action,
      remove: action,
    });
  }

  company?: ICompanyViewDTO = undefined;

  setCompany = (value?: ICompanyViewDTO) => (this.company = value);

  init = async () => {
    this.setCompany();
    if (this.authStore.isAuth && typeof window !== 'undefined') {
      this.setLoading(true);
      try {
        const data =
          await this.clientService.TenantBusinessPartners.getTenantBusinessPartnerOfUser();
        this.setCompany(data);
      } catch (err) {
      } finally {
        this.setLoading(false);
      }
    }
  };

  // delete

  isRemoving = false;

  setRemoving = (value: boolean) => (this.isRemoving = value);

  remove = async () => {
    if (this.authStore.isAuth && this.company) {
      this.setRemoving(true);
      try {
        const id = this.company.id as string;
        await this.clientService.TenantBusinessPartners.deleteTenantBusinessPartner(
          id
        );
      } catch (err) {
      } finally {
        this.setRemoving(false);
      }
    }
  };
}
