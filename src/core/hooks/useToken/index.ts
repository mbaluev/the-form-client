import { initializeDiContainer } from '@app/diContainer/diContainer';
import { IAuthService } from '@service/modules/auth/interface';
import { SERVICE } from '@service/ids';

export const useToken = async (refreshToken?: string) => {
  const container = initializeDiContainer();
  const serviceAuth = container.get<IAuthService>(SERVICE.Auth);
  const data = await serviceAuth.getToken(refreshToken);
  return data?.token || null;
};
