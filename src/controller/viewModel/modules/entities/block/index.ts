import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockDTO } from '@model/entities/block';
import { BlockService } from 'controller/service/modules/entities/block';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { FilterViewModel } from '@viewModel/modules/common/filter';

@injectable()
export class BlockViewModel
  extends BaseCardViewModel<IBlockDTO>
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

  blockData?: IBlockDTO | null = undefined;

  setBlockData = (data?: IBlockDTO | null) => {
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
      const token = await this.auth.verify();
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
        const token = await this.auth.verify();
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
        const token = await this.auth.verify();
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
        const token = await this.auth.verify();
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
}
