import { inject, injectable } from 'inversify';
import { TaskBaseDocumentStore } from '@store/modules/entities/task/baseDocument';
import { STORE } from '@store/ids';
import type ITaskAdminDocumentStore from '@store/modules/entities/task/adminDocument/interface';
import type IBlockAdminStore from '@store/modules/entities/block/admin/interface';

@injectable()
export class TaskAdminDocumentStore
  extends TaskBaseDocumentStore
  implements ITaskAdminDocumentStore
{
  @inject(STORE.BlockAdmin) protected blockAdminStore!: IBlockAdminStore;

  // --- override

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        await this.serviceTask.sentTaskAdmin(this.modalData);
        await this.clearModalChanges();
        if (this.blockAdminStore.data) {
          const blockId = this.blockAdminStore.data.id;
          await this.blockAdminStore.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
    return undefined;
  };
}
