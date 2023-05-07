import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IMaterialDTO, IMaterialUserDTO } from '@model/material';
import { SERVICE } from '@service/ids';
import { FileService } from '@service/modules/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';
import { action, makeObservable } from 'mobx';
import { MaterialService } from '@service/modules/material';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/block/user';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

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

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IMaterialDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'document.name')) {
          result =
            result ||
            (item.document.name !== undefined &&
              item.document.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document.description !== undefined &&
              item.document.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.file.name')) {
          result =
            result ||
            (item.document.file.name !== undefined &&
              item.document.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

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

  getData = async (id: string) => {
    this.setModalLoading(true);
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
      this.setModalLoading(false);
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
