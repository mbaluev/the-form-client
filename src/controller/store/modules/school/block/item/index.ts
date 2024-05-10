import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IBlockUserDTO } from '@model/entities/block';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';
import type IBlockService from '@service/modules/entities/block/interface';

@injectable()
export class BlockSchoolItemStore
  extends BaseCardStore<IBlockUserDTO>
  implements IBlockSchoolItemStore
{
  @inject(SERVICE.Block) private blockService!: IBlockService;

  // --- override

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.blockService.getBlockUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
