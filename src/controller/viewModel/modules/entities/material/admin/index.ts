import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';
import { MaterialBaseViewModel } from '@viewModel/modules/entities/material/base';

@injectable()
export class MaterialAdminViewModel
  extends MaterialBaseViewModel
  implements IMaterialAdminViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: BlockAdminViewModel;

  // --- override

  getList = async () => {
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceMaterial.getMaterialsUser(
          { userBlockId: this.userBlock.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceMaterial.getMaterialUser(
        id,
        undefined,
        token
      );
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
