import { inject, injectable } from 'inversify';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { action, computed, makeObservable } from 'mobx';
import { QuestionBaseViewModel } from '@viewModel/modules/entities/question/base';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class QuestionUserViewModel extends QuestionBaseViewModel implements IQuestionUserViewModel {
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
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const data = await this.serviceQuestion.getQuestionsUser({
          userBlockId: this.userBlock.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery, setIndex?: boolean) => {
    this.setDataLoading(true);
    if (id && setIndex) this.setIndex(this.getIndexById(id));
    try {
      const data = await this.serviceQuestion.getQuestionUser(id, query);
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
                newData.userQuestionAnswers = newData.userQuestionAnswers?.filter(
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
        await this.serviceQuestion.saveQuestionAnswers(this.data.id, this.data.userQuestionAnswers);
      }
    } catch (err) {
    } finally {
    }
  };

  checkQuestions = async () => {
    this.setListLoading(true);
    try {
      if (this.list && this.userBlock.data) {
        const blockId = this.userBlock.data.id;
        await this.serviceQuestion.checkQuestions(blockId);
        await this.userBlock.getData(blockId);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
