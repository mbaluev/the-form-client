import { ITaskUserDocumentDTO } from '@model/entities/task';
import { IFileDTO } from '@model/common/file';
import type IBaseCardStore from '@store/modules/base/card/interfaces';

export default interface ITaskBaseDocumentStore extends IBaseCardStore<ITaskUserDocumentDTO> {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (id: string, filename: string) => Promise<void>;
}
