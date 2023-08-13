import { inject, injectable } from 'inversify';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { QuestionBaseViewModel } from '@viewModel/modules/entities/question/base';
import { VIEW_MODEL } from '@viewModel/ids';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';

@injectable()
export class QuestionAdminViewModel
  extends QuestionBaseViewModel
  implements IQuestionAdminViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: IBlockAdminViewModel;

  @inject(VIEW_MODEL.Auth) protected modelAuth!: IAuthViewModel;

  constructor() {
    super();
    this.setValidations([
      { nameSpace: 'commentText', type: 'required', message: 'Required' },
    ]);
  }

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.getQuestionsAdmin(
          { userBlockId: this.userBlock.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string, setIndex?: boolean) => {
    this.setDataLoading(true);
    if (setIndex) this.setIndex(this.getIndexById(id));
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceQuestion.getQuestionAdmin(
        id,
        undefined,
        token
      );
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        const token = await this.modelAuth.refreshToken();
        await this.serviceQuestion.saveQuestionComment(
          this.modalData.userBlockId,
          this.modalData.id,
          this.modalData.commentText,
          token
        );
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
