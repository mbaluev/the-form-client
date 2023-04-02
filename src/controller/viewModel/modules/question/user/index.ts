import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IQuestionUserDTO } from '@model/question';
import { QuestionService } from '@service/modules/question';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockViewModel } from '@viewModel/modules/block';
import { AuthViewModel } from '@viewModel/modules/auth';
import { IQuestionUserViewModel } from '@viewModel/modules/question/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/block/user';

@injectable()
export class QuestionUserViewModel
  extends BaseCardViewModel<IQuestionUserDTO>
  implements IQuestionUserViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: QuestionService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: BlockUserViewModel;

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.getQuestionsUser(
          { blockId: this.block.data.id },
          token
        );
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
