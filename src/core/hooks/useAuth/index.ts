import { useContainer } from '@hooks/useContainer';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';

export const useAuth = () => {
  const container = useContainer();
  return container.get<IAuthViewModel>(VIEW_MODEL.Auth);
};
