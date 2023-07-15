import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IQuestionUserDTO } from '@model/entities/question';
import { QuestionService } from 'controller/service/modules/entities/question';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/common/auth';
import {
  IQuestionUserViewModel,
  ITestStatus,
} from '@viewModel/modules/entities/question/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/entities/block/user';
import { action, computed, makeObservable, observable } from 'mobx';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';

@injectable()
export class QuestionUserViewModel
  extends BaseCardViewModel<IQuestionUserDTO>
  implements IQuestionUserViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: QuestionService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.BlockUser) protected block!: BlockUserViewModel;

  constructor() {
    super();
    makeObservable(this, {
      status: computed,
      isStart: computed,
      isNext: computed,
      isPrev: computed,
      isFinish: computed,

      index: observable,
      setIndex: action,

      start: action,
      stop: action,
      prev: action,
      next: action,
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
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.getQuestionsUser(
          { userBlockId: this.block.data.id },
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

  getDataByIndex = async (index: number) => {
    if (this.list) {
      const id = this.list[index].id;
      await this.getData(id);
    }
  };

  getIndexById = (id: string) => {
    let index;
    this.list?.forEach((d, i) => {
      if (d.id === id) index = i;
    });
    return index;
  };

  // --- computed

  get status() {
    const status: ITestStatus = {
      code: undefined,
      total: 0,
      complete: 0,
      fail: 0,
    };
    if (this.list) {
      status.total = this.list.length;
      status.complete = this.list.filter((d) => d.complete === true).length;
      status.fail = this.list.filter((d) => d.complete === false).length;
      if (status.total > 0) status.code = 'new';
      if (status.fail > 0) status.code = 'fail';
      if (status.complete === status.total) status.code = 'success';
    }
    return status;
  }

  get isStart() {
    return !this.block.data?.completeQuestions;
  }

  get isNext() {
    return (
      this.index !== undefined &&
      this.list !== undefined &&
      this.list !== null &&
      this.index < this.list.length - 1
    );
  }

  get isPrev() {
    return this.index !== undefined && this.index > 0;
  }

  get isFinish() {
    return (
      !this.block.data?.completeQuestions &&
      Boolean(
        this.list?.reduce((prev, curr) => {
          return prev && curr.userQuestionAnswers?.length !== 0;
        }, true)
      )
    );
  }

  // --- actions

  index?: number = undefined;

  setIndex = (value?: number) => {
    this.index = value;
  };

  start = async () => {
    this.setIndex(0);
    await this.getDataByIndex(0);
  };

  stop = async () => {
    this.setIndex();
    await this.clearData();
  };

  prev = async () => {
    if (
      this.isPrev &&
      this.index !== undefined &&
      !this.isListLoading &&
      !this.isDataLoading
    ) {
      const index = this.index - 1;
      this.setIndex(index);
      await this.getDataByIndex(index);
    }
  };

  next = async () => {
    if (
      this.isNext &&
      this.index !== undefined &&
      this.list &&
      !this.isListLoading &&
      !this.isDataLoading
    ) {
      const index = this.index + 1;
      this.setIndex(index);
      await this.getDataByIndex(index);
    }
  };

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
      if (this.list && this.block.data) {
        const token = await this.auth.refreshToken();
        const blockId = this.block.data.id;
        await this.serviceQuestion.checkQuestions(blockId, token);
        await this.block.getData(blockId);
        this.block.changeTab(BlockTabNames.questions);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };
}
