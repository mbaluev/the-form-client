import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { action, computed, makeObservable } from 'mobx';
import { BlockTabNames } from 'ui/pages/school/block/[id]/blockTabs';
import { QuestionBaseViewModel } from '@viewModel/modules/entities/question/base';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';

@injectable()
export class QuestionUserViewModel
  extends QuestionBaseViewModel
  implements IQuestionUserViewModel
{
  @inject(VIEW_MODEL.BlockUser) protected userBlock!: BlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      isStart: computed,
      isFinish: computed,

      finish: action,
      changeAnswer: action,
      saveQuestionAnswers: action,
      checkQuestions: action,
    });
  }

  // --- override

  getList = async () => {
    await this.clearList();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.getQuestionsUser(
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
      const data = await this.serviceQuestion.getQuestionUser(
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

  // --- computed

  get isStart() {
    return !this.userBlock.data?.completeQuestions;
  }

  get isFinish() {
    return (
      !this.userBlock.data?.completeQuestions &&
      Boolean(
        this.list?.reduce((prev, curr) => {
          return prev && curr.userQuestionAnswers?.length !== 0;
        }, true)
      )
    );
  }

  // --- actions

  finish = async () => {
    if (this.isFinish && !this.isListLoading && !this.isDataLoading) {
      await this.stop();
      await this.checkQuestions();
    }
  };

  changeAnswer = (optionId: string, checked: boolean) => {
    if (this.list && this.data) {
      const newList = [...this.list];
      const newData = { ...this.data };
      newList.forEach((q) => {
        if (q.id === newData.id) {
          switch (newData.question?._type) {
            case 'checkbox':
              if (checked) {
                q.userQuestionAnswers?.push({
                  questionOptionId: optionId,
                });
                newData.userQuestionAnswers?.push({
                  questionOptionId: optionId,
                });
              } else {
                q.userQuestionAnswers = q.userQuestionAnswers?.filter(
                  (a) => a.questionOptionId !== optionId
                );
                newData.userQuestionAnswers =
                  newData.userQuestionAnswers?.filter(
                    (a) => a.questionOptionId !== optionId
                  );
              }
              break;
            case 'radio':
              q.userQuestionAnswers = [{ questionOptionId: optionId }];
              newData.userQuestionAnswers = [{ questionOptionId: optionId }];
              break;
          }
        }
      });
      this.setList(newList);
      this.setData(newData);
    }
  };

  saveQuestionAnswers = async () => {
    try {
      if (this.data) {
        const token = await this.auth.refreshToken();
        await this.serviceQuestion.saveQuestionAnswers(
          this.data.id,
          this.data.userQuestionAnswers,
          token
        );
      }
    } catch (err) {
    } finally {
    }
  };

  checkQuestions = async () => {
    this.setListLoading(true);
    try {
      if (this.list && this.userBlock.data) {
        const token = await this.auth.refreshToken();
        const blockId = this.userBlock.data.id;
        await this.serviceQuestion.checkQuestions(blockId, token);
        await this.userBlock.getData(blockId);
        this.userBlock.changeTab(BlockTabNames.questions);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
