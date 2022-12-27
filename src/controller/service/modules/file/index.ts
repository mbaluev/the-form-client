import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IFileService } from '@service/modules/file/interface';
import { IFileDTO } from '@model/file';
import { guid } from '@utils/guid/guid';

@injectable()
export class FileService implements IFileService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  uploadFiles = async (files: File[]): Promise<IFileDTO[]> => {
    const ret = files.map((file) => {
      return {
        id: guid(),
        path: `http://${file.name}`,
        name: file.name,
        size: file.size,
      };
    });
    return new Promise<IFileDTO[]>((resolve) => {
      setTimeout(() => {
        resolve(ret);
      }, 1000);
    });
  };
}
