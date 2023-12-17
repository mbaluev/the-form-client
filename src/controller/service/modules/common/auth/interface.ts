import { IAccountDTO, IAuthResponse } from 'controller/model/common/auth';

export default interface IAuthService {
  signUp: (data: IAccountDTO) => Promise<IAuthResponse>;
  signIn: (data: IAccountDTO) => Promise<IAuthResponse>;
  signOut: () => Promise<IAuthResponse>;
}
