import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { ITenantItemDTO } from '@model/onboard/tenant';
import type IClientService from '@service/modules/client/interface';
import type ITenantsStore from '@store/modules/onboard/tenant/list/interface';
import type ICompanyViewStore from '@store/modules/onboard/company/view/interface';

@injectable()
export class TenantsStore
  extends BaseListStore<ITenantItemDTO>
  implements ITenantsStore
{
  @inject(SERVICE.Client) private clientService!: IClientService;

  @inject(STORE.CompanyView) private companyViewStore!: ICompanyViewStore;

  getData = async () => {
    this.setData();
    if (this.companyViewStore.company) {
      this.setLoading(true);
      try {
        const id = this.companyViewStore.company.id as string;
        const data = await this.clientService.T1Tenants.listTenants(id);
        this.setData(data);
      } catch (err) {
      } finally {
        this.setLoading(false);
      }
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data
      ?.filter((d) => {
        return (
          d.id?.toLowerCase()?.includes(searchText || '') ||
          d.displayName?.toLowerCase()?.includes(searchText || '') ||
          d.domain?.toLowerCase()?.includes(searchText || '')
        );
      })
      ?.slice()
      ?.sort((a, b) =>
        a.displayName && b.displayName
          ? a.displayName.localeCompare(b.displayName)
          : 0
      );
  }

  filterName = 'query';
}
