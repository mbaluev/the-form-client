import { inject, injectable } from 'inversify';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { QuestionBaseViewModel } from '@viewModel/modules/entities/question/base';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockAdminViewModel } from '@viewModel/modules/entities/block/admin';

@injectable()
export class QuestionAdminViewModel
  extends QuestionBaseViewModel
  implements IQuestionAdminViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: BlockAdminViewModel;

  // --- override

  getList = async () => {
    await this.clearList();
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

  // --- actions
}
