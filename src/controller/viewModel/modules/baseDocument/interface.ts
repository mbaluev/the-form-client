import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IDocumentDTO, TDocumentType } from '@model/document';
import { IFileDTO } from '@model/file';

export interface IBaseDocumentViewModel
  extends IBaseCardViewModel<IDocumentDTO> {
  documentType: TDocumentType;
  upload: (files: File[]) => Promise<IFileDTO[]>;
  download: (path: string) => void;
}
