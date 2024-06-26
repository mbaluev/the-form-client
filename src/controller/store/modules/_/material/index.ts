/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import _ from 'lodash';
import objectPath from 'object-path';
import { inject, injectable } from 'inversify';
import { IMaterialDTO } from '@model/entities/material';
import { SERVICE } from '@service/ids';
import { action, makeObservable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import type IMaterialStore from '@store/modules/_/material/interface';
import type IMaterialService from '@service/modules/entities/material/interface';
import type IFileService from '@service/modules/common/file/interface';
import type IBlockStore from '@store/modules/_/block/interface';

@injectable()
export class MaterialStore extends BaseCardStore<IMaterialDTO> implements IMaterialStore {
  @inject(SERVICE.Material) protected serviceMaterial!: IMaterialService;

  @inject(SERVICE.File) protected serviceFile!: IFileService;

  @inject(STORE.Block) protected blockStore!: IBlockStore;

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
            const docType = objectPath.get(this.modalData, 'document.documentType.name');
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
            const docType = objectPath.get(this.modalData, 'document.documentType.name');
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
              item.document?.name.toLowerCase().includes((query.filter as string).toLowerCase()));
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
              item.document?.url.toLowerCase().includes((query.filter as string).toLowerCase()));
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
      if (this.blockStore.data) {
        const data = await this.serviceMaterial.getMaterials({
          blockId: this.blockStore.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalLoading(true);
    try {
      const data = await this.serviceMaterial.getMaterial(id, query);
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
        this.changeModalField('blockId', this.blockStore.data?.id);
        const data = await this.serviceMaterial.saveMaterial(this.modalData);
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
        await this.serviceMaterial.deleteMaterials(this.deleteIds);
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
      return await this.serviceFile.uploadFile(file);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  download = async (id: string, filename: string) => {
    try {
      await this.serviceFile.downloadFile(id, filename);
    } catch (err) {
    } finally {
    }
  };
}
