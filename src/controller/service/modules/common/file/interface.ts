import { IFileDTO } from '@model/common/file';

export interface IFileService {
  uploadFile: (file: File) => Promise<IFileDTO | undefined>;
  downloadFile: (id: string, filename: string) => Promise<void>;
}
