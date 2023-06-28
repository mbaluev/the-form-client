/* eslint-disable sonarjs/cognitive-complexity */
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IMaterialDTO, IMaterialUserDTO } from '@model/entities/material';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { action, makeObservable } from 'mobx';
import { MaterialService } from 'controller/service/modules/entities/material';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';

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
      update: action,
    });
  }

  // --- override

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
              item.document.name !== null &&
              item.document.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document.description !== undefined &&
              item.document.description !== null &&
              item.document.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.file.name')) {
          result =
            result ||
            (item.document.file.name !== undefined &&
              item.document.file.name !== null &&
              item.document.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.url')) {
          result =
            result ||
            (item.document.url !== undefined &&
              item.document.url !== null &&
              item.document.url
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  getList = async () => {
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

  download = async (id: string, filename: string) => {
    try {
      const token = await this.auth.refreshToken();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };

  update = async (id: string, complete: boolean) => {
    if (!complete) {
      this.setDataLoading(true);
      try {
        const token = await this.auth.refreshToken();
        await this.serviceMaterial.updateMaterialUser(id, token);
        if (this.block.data) await this.block.getData(this.block.data.id);
        this.block.changeTab(BlockTabNames.materials);
        return true;
      } catch (err) {
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };
}
