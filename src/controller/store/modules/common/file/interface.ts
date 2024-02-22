import { IFileDTO } from '@model/common/file';
import type IBaseStore from '@store/modules/base/store/interface';

export default interface IFileStore extends IBaseStore {
  upload: (file: File) => Promise<IFileDTO | undefined>;
  download: (file: IFileDTO) => Promise<void>;
}
