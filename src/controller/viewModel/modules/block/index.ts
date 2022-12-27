import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockDTO } from '@model/block';
import { BlockService } from '@service/modules/block';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { action, makeObservable, observable } from 'mobx';

@injectable()
export class BlockViewModel
  extends BaseCardViewModel<IBlockDTO>
  implements IBlockViewModel
{
  @inject(SERVICE.Block) protected service!: BlockService;

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
        const data = await this.service.saveBlock(this.data);
        this.updateFromList(data);
        await this.clearChanges();
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
        const data = await this.service.saveBlock(this.modalData);
        this.updateFromList(data);
        await this.clearModalChanges();
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
        await this.service.deleteBlocks(this.deleteIds);
        this.removeFromList(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
