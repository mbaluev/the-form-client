import { IDocumentDTO, TDocumentType } from '@model/document';

export interface IDocumentService {
  getDocuments: (
    blockId: string,
    documentType: TDocumentType
  ) => Promise<IDocumentDTO[] | undefined>;
  getDocument: (id?: string) => Promise<IDocumentDTO | undefined>;
  saveDocument: (data: IDocumentDTO) => Promise<IDocumentDTO>;
  deleteDocuments: (ids: string[]) => Promise<boolean>;
}
