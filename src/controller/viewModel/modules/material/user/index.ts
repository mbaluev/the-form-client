import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IMaterialUserDTO } from '@model/material';
import { SERVICE } from '@service/ids';
import { FileService } from '@service/modules/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';
import { action, makeObservable } from 'mobx';
import { MaterialService } from '@service/modules/material';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/block/user';
import { BlockTabNames } from '@ui/pages/block/blockTabs';

@injectable()
export class MaterialUserViewModel
  extends BaseCardViewModel<IMaterialUserDTO>
  implements IMaterialUserViewModel
{
  @inject(SERVICE.Material) protected serviceMaterial!: MaterialService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: BlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  // --- user

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceMaterial.getMaterialsUser(
          { blockId: this.block.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  download = async (
    id: string,
    filename: string,
    materialId: string,
    blockId: string
  ) => {
    try {
      const token = await this.auth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
      await this.serviceMaterial.updateMaterialUser(materialId, token);
      await this.block.getData(blockId);
      this.block.changeTab(BlockTabNames.materials);
      return true;
    } catch (err) {
      return false;
    } finally {
    }
  };
}
