import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';
import { MaterialBaseViewModel } from '@viewModel/modules/entities/material/base';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class MaterialAdminViewModel
  extends MaterialBaseViewModel
  implements IMaterialAdminViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: BlockAdminViewModel;

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const data = await this.serviceMaterial.getMaterialsUser({
          userBlockId: this.userBlock.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.serviceMaterial.getMaterialUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
