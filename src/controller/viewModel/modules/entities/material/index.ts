/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { inject, injectable } from 'inversify';
import { IMaterialViewModel } from '@viewModel/modules/entities/material/interface';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IMaterialDTO } from '@model/entities/material';
import { SERVICE } from '@service/ids';
import { FileService } from 'controller/service/modules/common/file';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import { action, makeObservable } from 'mobx';
import { BlockViewModel } from '@viewModel/modules/entities/block';
import { MaterialService } from 'controller/service/modules/entities/material';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import objectPath from 'object-path';

@injectable()
export class MaterialViewModel
  extends BaseCardViewModel<IMaterialDTO>
  implements IMaterialViewModel
{
  @inject(SERVICE.Material) protected serviceMaterial!: MaterialService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Block) protected block!: BlockViewModel;

  constructor() {
    super();
    makeObservable(this, {
      upload: action,
      download: action,
    });
    this.setValidations([
      {
        nameSpace: 'document.documentTypeId',
        type: 'required',
        message: 'Required',
      },
      { nameSpace: 'document.name', type: 'required', message: 'Required' },
      {
        nameSpace: 'document.description',
        type: 'required',
        message: 'Required',
      },
      {
        nameSpace: 'document.fileId',
        type: 'required',
        message: 'Required',
        condition: () => {
          if (this.modalData) {
            const docType = objectPath.get(
              this.modalData,
              'document.documentType.name'
            );
            return docType === 'file';
          }
          return false;
        },
      },
      {
        nameSpace: 'document.url',
        type: 'required',
        message: 'Required',
        condition: () => {
          if (this.modalData) {
            const docType = objectPath.get(
              this.modalData,
              'document.documentType.name'
            );
            return docType === 'link' || docType === 'video';
          }
          return false;
        },
      },
      {
        nameSpace: 'document.url',
        type: 'link',
        message: 'Incorrect url',
      },
    ]);
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
            (item.document?.name !== undefined &&
              item.document?.name !== null &&
              item.document?.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.description')) {
          result =
            result ||
            (item.document?.description !== undefined &&
              item.document?.description !== null &&
              item.document?.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.file.name')) {
          result =
            result ||
            (item.document?.file.name !== undefined &&
              item.document?.file.name !== null &&
              item.document?.file.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'document.url')) {
          result =
            result ||
            (item.document?.url !== undefined &&
              item.document?.url !== null &&
              item.document?.url
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
        const data = await this.serviceMaterial.getMaterials(
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

  getModalData = async (id: string) => {
    this.setModalLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceMaterial.getMaterial(id, undefined, token);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        this.changeModalField('blockId', this.block.data?.id);
        const token = await this.auth.refreshToken();
        const data = await this.serviceMaterial.saveMaterial(
          this.modalData,
          token
        );
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        const token = await this.auth.refreshToken();
        await this.serviceMaterial.deleteMaterials(this.deleteIds, token);
        await this.getList();
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

  // -- other

  upload = async (file: File) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.refreshToken();
      return await this.serviceFile.uploadFile(file, token);
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
}
