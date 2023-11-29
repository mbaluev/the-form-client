/* eslint-disable sonarjs/cognitive-complexity */
import _ from 'lodash';
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IMaterialUserDTO } from '@model/entities/material';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { action, makeObservable } from 'mobx';
import { MaterialService } from 'controller/service/modules/entities/material';
import { ParsedUrlQuery } from 'querystring';
import { IMaterialBaseViewModel } from '@viewModel/modules/entities/material/base/interface';

@injectable()
export class MaterialBaseViewModel
  extends BaseCardViewModel<IMaterialUserDTO>
  implements IMaterialBaseViewModel
{
  @inject(SERVICE.Material) protected serviceMaterial!: MaterialService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  constructor() {
    super();
    makeObservable(this, {
      download: action,
    });
  }

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IMaterialUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'material.document.name')) {
          result =
            result ||
            (item.material?.document?.name !== undefined &&
              item.material?.document?.name !== null &&
              item.material?.document?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'material.document.description')) {
          result =
            result ||
            (item.material?.document?.description !== undefined &&
              item.material?.document?.description !== null &&
              item.material?.document?.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'material.document.file.name')) {
          result =
            result ||
            (item.material?.document?.file.name !== undefined &&
              item.material?.document?.file.name !== null &&
              item.material?.document?.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'material.document.url')) {
          result =
            result ||
            (item.material?.document?.url !== undefined &&
              item.material?.document?.url !== null &&
              item.material?.document?.url
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  download = async (id: string, filename: string) => {
    try {
      const token = await this.auth.verify();
      await this.serviceFile.downloadFile(id, filename, token);
    } catch (err) {
    } finally {
    }
  };
}
