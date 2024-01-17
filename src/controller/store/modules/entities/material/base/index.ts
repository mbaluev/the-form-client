/* eslint-disable sonarjs/cognitive-complexity */
import _ from 'lodash';
import { inject, injectable } from 'inversify';
import { IMaterialUserDTO } from '@model/entities/material';
import { SERVICE } from '@service/ids';
import { action, makeObservable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import type IMaterialBaseStore from '@store/modules/entities/material/base/interface';
import type IMaterialService from '@service/modules/entities/material/interface';
import type IFileService from '@service/modules/common/file/interface';

@injectable()
export class MaterialBaseStore
  extends BaseCardStore<IMaterialUserDTO>
  implements IMaterialBaseStore
{
  @inject(SERVICE.Material) protected serviceMaterial!: IMaterialService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

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
      await this.serviceFile.downloadFile(id, filename);
    } catch (err) {
    } finally {
    }
  };
}
