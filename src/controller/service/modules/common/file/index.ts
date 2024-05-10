import { inject, injectable } from 'inversify';
import { IFileDTO } from '@model/common/file';
import { IResponseItemDTO } from '@model/common/response';
import { API } from '@api/ids';
import type IFileService from '@service/modules/common/file/interface';
import type IAxiosApi from '@api/modules/axios/interface';

@injectable()
export class FileService implements IFileService {
  @inject(API.Axios) protected axiosApi!: IAxiosApi;

  API_PREFIX = `api/file`;

  uploadFile = async (file: File): Promise<IFileDTO | undefined> => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const ret = await this.axiosApi.post<IResponseItemDTO<IFileDTO>>(
      `${this.API_PREFIX}/upload`,
      formData
    );
    return ret ? ret.data : undefined;
  };

  downloadFile = async (id: string, filename: string) => {
    await this.axiosApi.download(`${this.API_PREFIX}/download/${id}`, filename);
  };
}
