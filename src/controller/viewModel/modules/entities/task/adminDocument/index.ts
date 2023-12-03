import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskAdminDocumentViewModel } from '@viewModel/modules/entities/task/adminDocument/interface';
import { TaskBaseDocumentViewModel } from '@viewModel/modules/entities/task/baseDocument';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';

@injectable()
export class TaskAdminDocumentViewModel
  extends TaskBaseDocumentViewModel
  implements ITaskAdminDocumentViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: BlockAdminViewModel;

  // --- override

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        await this.serviceTask.sentTaskAdmin(this.modalData);
        await this.clearModalChanges();
        if (this.userBlock.data) {
          const blockId = this.userBlock.data.id;
          await this.userBlock.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
    return undefined;
  };
}
