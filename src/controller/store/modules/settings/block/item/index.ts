import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IBlockDTO } from '@model/entities/block';
import type IBlockSettingsItemStore from '@store/modules/settings/block/item/interface';
import type IBlockService from '@service/modules/entities/block/interface';

@injectable()
export class BlockSettingsItemStore
  extends BaseCardStore<IBlockDTO>
  implements IBlockSettingsItemStore
{
  @inject(SERVICE.Block) private blockService!: IBlockService;

  // --- override

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

  saveData = async (data?: IBlockDTO) => {
    this.setSaveLoading(true);
    try {
      if (data) {
        const res = await this.blockService.saveBlock(data);
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
        await this.blockService.deleteBlocks(this.deleteIds);
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
