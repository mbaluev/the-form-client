import { IFileDTO } from '@model/common/file';

interface IFileService {
  uploadFile: (file: File) => Promise<IFileDTO | undefined>;
  downloadFile: (id: string, filename: string) => Promise<void>;
}

export default IFileService;
