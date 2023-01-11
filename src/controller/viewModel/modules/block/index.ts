import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockDTO } from '@model/block';
import { BlockService } from '@service/modules/block';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';

@injectable()
export class BlockViewModel
  extends BaseCardViewModel<IBlockDTO>
  implements IBlockViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

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
    } finally {
    }
  };

  // --- override

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceBlock.saveBlock(this.data, token);
        if (data) {
          this.updateFromList(data);
          await this.clearChanges();
        }
        return data;
      }
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
        if (data) {
          this.updateFromList(data);
          await this.clearModalChanges();
        }
        return data;
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async () => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceBlock.deleteBlocks(
          this.deleteIds,
          token
        );
        if (data) {
          this.removeFromList(this.deleteIds);
          await this.clearDelete();
          await this.clearData();
        }
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
