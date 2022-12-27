import { inject, injectable } from 'inversify';
import { INFRASTRUCTURE_MODULE } from '@infrastructure/ids';
import { IAxiosApiModule } from '@infrastructure/modules/axios/interface';
import { IDocumentDTO, TDocumentType } from '@model/document';
import { MOCK_DOCUMENTS } from '@model/document/mock';
import { IDocumentService } from '@service/modules/document/interface';
import { guid } from '@utils/guid/guid';

@injectable()
export class DocumentService implements IDocumentService {
  @inject(INFRASTRUCTURE_MODULE.Axios) protected apiModule!: IAxiosApiModule;

  getDocuments = async (
    blockId: string,
    documentType: TDocumentType
  ): Promise<IDocumentDTO[] | undefined> => {
    const documents = [...MOCK_DOCUMENTS].filter(
      (f) => f.blockId === blockId && f.documentType === documentType
    );
    return new Promise<IDocumentDTO[] | undefined>((resolve) => {
      setTimeout(() => resolve(documents), 1000);
    });
  };

  getDocument = async (id?: string): Promise<IDocumentDTO | undefined> => {
    const document = [...MOCK_DOCUMENTS].find((f) => f.id === id);
    return new Promise<IDocumentDTO | undefined>((resolve) => {
      setTimeout(() => resolve(document), 1000);
    });
  };

  saveDocument = async (data: IDocumentDTO) => {
    if (!data.id) data.id = guid();
    return new Promise<IDocumentDTO>((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  deleteDocuments = async (ids: string[]) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
}
