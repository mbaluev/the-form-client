import { IFileDTO } from '@model/file';

export interface IFileService {
  uploadFiles: (files: File[]) => Promise<IFileDTO[]>;
}
