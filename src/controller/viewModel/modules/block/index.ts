import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockUserDTO } from '@model/block';
import { BlockService } from '@service/modules/block';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';
import { FilterViewModel } from '@viewModel/modules/filter';

@injectable()
export class BlockViewModel
  extends BaseCardViewModel<IBlockUserDTO>
  implements IBlockViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Filter) protected filters!: FilterViewModel;

  constructor() {
    super();
    makeObservable(this, {
      blockData: observable,
      setBlockData: action,
      clearBlockData: action,
    });
    this.setValidations([
      { nameSpace: 'moduleId', type: 'required', message: 'Required' },
      { nameSpace: 'title', type: 'required', message: 'Required' },
      { nameSpace: 'name', type: 'required', message: 'Required' },
      { nameSpace: 'position', type: 'required', message: 'Required' },
    ]);
  }

  // --- observable

  blockData?: IBlockUserDTO | null = undefined;

  setBlockData = (data?: IBlockUserDTO | null) => {
    this.blockData = data;
  };

  clearBlockData = async () => {
    try {
      this.setBlockData();
    } catch (err) {
    } finally {
    }
  };

  // --- override

  getList = async () => {
    this.setListLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceBlock.getBlocks(
        this.filters.filters,
        token
      );
      this.setList(data);
    } catch (err) {
    } finally {
    }
  };

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceBlock.saveBlock(this.data, token);
        await this.getList();
        await this.clearChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceBlock.saveBlock(this.modalData, token);
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async () => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        const token = await this.auth.refreshToken();
        await this.serviceBlock.deleteBlocks(this.deleteIds, token);
        await this.getList();
        await this.clearDelete();
        await this.clearData();
        await this.clearBlockData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };

  // --- user

  getDataUser = async (id: string) => {
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceBlock.getBlockUser(id, undefined, token);
      this.setData(data);
      this.setBlockData(data);
    } catch (err) {
    } finally {
    }
  };
}
