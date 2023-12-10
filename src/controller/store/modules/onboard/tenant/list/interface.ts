import type IBaseListStore from '@store/modules/base/list/interface';
import { ITenantItemDTO } from '@model/onboard/tenant';

export default interface ITenantsStore extends IBaseListStore<ITenantItemDTO> {}
