import { IFileDTO } from 'controller/model/common/file';
import { IMaterialDTO } from '@model/entities/material';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface IMaterialStore extends IBaseCardStore<IMaterialDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
