import {
  BusinessPartnerResponse,
  TenantBusinessPartnerCreationRequest,
} from '@service/modules/client/api';
import { OrNull } from '@utils/ts/orNull';

export interface ICompanyViewDTO extends OrNull<BusinessPartnerResponse> {}

export interface ICompanyRegisterDTO
  extends OrNull<TenantBusinessPartnerCreationRequest> {}
