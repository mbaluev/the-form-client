import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { TaskBaseDocumentViewModel } from '@viewModel/modules/entities/task/baseDocument';

@injectable()
export class TaskUserDocumentViewModel
  extends TaskBaseDocumentViewModel
  implements ITaskUserDocumentViewModel
{
  @inject(VIEW_MODEL.BlockUser) protected userBlock!: BlockUserViewModel;

  // --- override

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        await this.serviceTask.sentTaskUser(this.modalData);
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
