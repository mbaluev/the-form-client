import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IDocumentDTO, TDocumentType } from '@model/document';
import { DocumentService } from '@service/modules/document';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockViewModel } from '@viewModel/modules/block';
import { FileService } from '@service/modules/file';
import { IBaseDocumentViewModel } from '@viewModel/modules/baseDocument/interface';

@injectable()
export class BaseDocumentViewModel
  extends BaseCardViewModel<IDocumentDTO>
  implements IBaseDocumentViewModel
{
  @inject(SERVICE.Document) protected serviceDocument!: DocumentService;

  @inject(SERVICE.File) protected serviceFile!: FileService;

  @inject(VIEW_MODEL.Block) protected block!: BlockViewModel;

  constructor() {
    super();
    makeObservable(this, {
      upload: action,
      download: action,
    });
    this.setValidations([
      { nameSpace: 'name', type: 'required', message: 'Required' },
      { nameSpace: 'description', type: 'required', message: 'Required' },
      { nameSpace: 'file.path', type: 'required', message: 'Required' },
    ]);
  }

  documentType: TDocumentType = 'base';

  // --- override

  getList = async () => {
    await this.clearList();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const data = await this.serviceDocument.getDocuments(
          this.block.data.id,
          this.documentType
        );
        if (data) {
          data.forEach((f) => (f.expanded = this.isListExpanded));
          this.setList(data);
        }
      }
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id: string) => {
    this.setModalLoading(true);
    try {
      const data = await this.serviceDocument.getDocument(id);
      if (data) {
        this.setModalData(data);
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  getSaveModalData = () => {
    if (!this.modalData) return null;
    const { expanded, ...saveData } = this.modalData;
    saveData.blockId = this.modalData.id;
    saveData.documentType = this.documentType;
    return saveData;
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      const saveData = this.getSaveModalData();
      if (saveData && !this.hasModalErrors) {
        const data = await this.serviceDocument.saveDocument(saveData);
        data.expanded = this.data?.expanded || this.isListExpanded;
        this.updateFromList(data);
        await this.clearModalChanges();
        return data;
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async () => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceDocument.deleteDocuments(this.deleteIds);
        this.removeFromList(this.deleteIds);
        await this.clearDelete();
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };

  // -- other

  upload = async (files: File[]) => {
    this.setDataLoading(true);
    try {
      return await this.serviceFile.uploadFiles(files);
    } finally {
      this.setDataLoading(false);
    }
  };

  download = (path: string) => {
    console.log('downloadFile', path);
  };
}
