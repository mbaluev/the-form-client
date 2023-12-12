import { IAccountDTO, IAuthResponse } from 'controller/model/common/auth';

export default interface IAuthService {
  signup: (data: IAccountDTO) => Promise<IAuthResponse>;
  signin: (data: IAccountDTO) => Promise<IAuthResponse>;
  signout: () => Promise<IAuthResponse>;
}
