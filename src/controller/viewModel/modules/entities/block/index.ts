import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IBlockDTO } from '@model/entities/block';
import { BlockService } from 'controller/service/modules/entities/block';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { action, makeObservable, observable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class BlockViewModel
  extends BaseCardViewModel<IBlockDTO>
  implements IBlockViewModel
{
  @inject(SERVICE.Block) protected serviceBlock!: BlockService;

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

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.serviceBlock.getBlocks(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceBlock.getBlock(id, query);
      this.setData(data);
      this.setBlockData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.serviceBlock.saveBlock(this.data);
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
        const data = await this.serviceBlock.saveBlock(this.modalData);
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
        await this.serviceBlock.deleteBlocks(this.deleteIds);
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
