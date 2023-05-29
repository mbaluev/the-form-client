import { IFileDTO } from '@model/common/file';

export interface IFileService {
  uploadFile: (
    file: File,
    token?: string | null
  ) => Promise<IFileDTO | undefined>;
  downloadFile: (
    id: string,
    filename: string,
    token?: string | null
  ) => Promise<void>;
}
