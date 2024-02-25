import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IUserDTO } from '@model/entities/user';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import type IUserSettingsItemStore from '@store/modules/settings/user/item/interface';
import type IUserService from '@service/modules/entities/user/interface';

@injectable()
export class UserSettingsItemStore
  extends BaseCardStore<IUserDTO>
  implements IUserSettingsItemStore
{
  @inject(SERVICE.User) protected userService!: IUserService;

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.userService.getUsers(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.userService.getUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async (data?: IUserDTO) => {
    this.setSaveLoading(true);
    try {
      if (data) {
        const res = await this.userService.saveUser(data);
        this.setData(res);
        return res;
      }
    } catch (err) {
    } finally {
      this.setSaveLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.userService.deleteUsers(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
