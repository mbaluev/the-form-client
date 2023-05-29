import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IFileService } from '@service/modules/common/file/interface';
import { IFileDTO } from '@model/common/file';
import { IResponseItemDTO } from '@model/common/response';

@injectable()
export class FileService implements IFileService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  API_PREFIX = `api/file`;

  uploadFile = async (
    file: File,
    token?: string | null
  ): Promise<IFileDTO | undefined> => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const ret = await this.apiModule.post<IResponseItemDTO<IFileDTO>>(
      `${this.API_PREFIX}/upload`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return ret ? ret.data : undefined;
  };

  downloadFile = async (
    id: string,
    filename: string,
    token?: string | null
  ) => {
    await this.apiModule.getDownload(
      `${this.API_PREFIX}/download/${id}`,
      filename,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
}
