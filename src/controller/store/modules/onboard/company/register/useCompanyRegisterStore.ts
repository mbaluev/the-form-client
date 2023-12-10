import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type ICompanyRegisterStore from '@store/modules/onboard/company/register/interface';

export const useCompanyRegisterStore = () => {
  const container = useContainer();
  return container.get<ICompanyRegisterStore>(STORE.CompanyRegister);
};
