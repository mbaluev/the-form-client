import { inject, injectable } from 'inversify';
import { STORE } from '@store/ids';
import { TaskBaseDocumentStore } from '@store/modules/entities/task/baseDocument';
import type ITaskUserDocumentStore from '@store/modules/entities/task/userDocument/interface';
import type IBlockUserStore from '@store/modules/entities/block/_/user/interface';

@injectable()
export class TaskUserDocumentStore extends TaskBaseDocumentStore implements ITaskUserDocumentStore {
  @inject(STORE.BlockUser) protected blockUserStore!: IBlockUserStore;

  // --- override

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        await this.serviceTask.sentTaskUser(this.modalData);
        await this.clearModalChanges();
        if (this.blockUserStore.data) {
          const blockId = this.blockUserStore.data.id;
          await this.blockUserStore.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
    return undefined;
  };
}
