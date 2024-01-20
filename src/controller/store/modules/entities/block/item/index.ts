import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import { IBlockDTO } from '@model/entities/block';
import type IBlockItemStore from '@store/modules/entities/block/item/interface';
import type IBlockService from '@service/modules/entities/block/interface';
import type IBlockListStore from '@store/modules/entities/block/list/interface';

@injectable()
export class BlockItemStore extends BaseCardStore<IBlockDTO> implements IBlockItemStore {
  @inject(SERVICE.Block) private blockService!: IBlockService;

  @inject(STORE.BlockList) protected blockListStore!: IBlockListStore;

  constructor() {
    super();
    this.setValidations([
      { nameSpace: 'moduleId', type: 'required', message: 'Required' },
      { nameSpace: 'title', type: 'required', message: 'Required' },
      { nameSpace: 'name', type: 'required', message: 'Required' },
      { nameSpace: 'position', type: 'required', message: 'Required' },
    ]);
  }

  // --- override

  getList = async (query?: ParsedUrlQuery) => {
    this.setListLoading(true);
    try {
      const data = await this.blockService.getBlocks(query);
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.blockService.getBlock(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveData = async () => {
    this.setDataLoading(true);
    try {
      if (this.data && !this.hasErrors) {
        const data = await this.blockService.saveBlock(this.data);
        await this.blockListStore.getData();
        await this.clearChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.blockService.deleteBlocks(this.deleteIds);
        await this.blockListStore.getData();
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
