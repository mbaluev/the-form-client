import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IUserDTO } from '@model/entities/user';
import { UserService } from 'controller/service/modules/entities/user';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';

@injectable()
export class UserAdminViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserAdminViewModel
{
  @inject(SERVICE.User) protected serviceUser!: UserService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  // --- override

  getList = async () => {
    this.setListLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceUser.getUsersAdmin(undefined, token);
      this.setList(data);
    } catch (err) {
    } finally {
    }
  };
}
