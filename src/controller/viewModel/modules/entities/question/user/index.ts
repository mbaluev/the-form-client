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
      index: observable,
      setIndex: action,
      status: computed,
      start: action,
      stop: action,
      prev: action,
      next: action,
      repeat: action,
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

  getData = async (id: string) => {
    this.setDataLoading(true);
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

  // --- actions

  index?: number = undefined;

  setIndex = (value?: number) => {
    this.index = value;
  };

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

  start = () => {
    this.setIndex(0);
  };

  stop = () => {
    this.clearData();
    this.setIndex();
  };

  prev = () => {
    if (this.index !== undefined) {
      const index = this.index > 0 ? this.index - 1 : 0;
      this.setIndex(index);
    }
  };

  next = () => {
    if (this.index !== undefined && this.list) {
      const index =
        this.index < this.list.length - 1 ? this.index + 1 : this.index;
      this.setIndex(index);
    }
  };

  repeat = () => {
    this.setIndex(0);
  };

  finish = () => {
    this.setIndex();
    this.checkQuestions();
  };

  changeAnswer = (optionId: string, checked: boolean) => {
    if (this.list && this.data) {
      const newList = [...this.list];
      const newData = { ...this.data };
      newList.forEach((q) => {
        if (q.id === newData.id) {
          switch (newData.type) {
            case 'checkbox':
              if (checked) {
                q.questionAnswers.push(optionId);
                newData.questionAnswers.push(optionId);
              } else {
                q.questionAnswers = q.questionAnswers.filter(
                  (a) => a !== optionId
                );
                newData.questionAnswers = newData.questionAnswers.filter(
                  (a) => a !== optionId
                );
              }
              break;
            case 'radio':
              q.questionAnswers = [optionId];
              newData.questionAnswers = [optionId];
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
          this.data.questionAnswers,
          token
        );
        // await this.getList();
        // await this.clearChanges();
        // await this.block.getData(blockId);
        // this.block.changeTab(BlockTabNames.questions);
      }
    } catch (err) {
    } finally {
    }
  };

  checkQuestions = async () => {
    this.setDataLoading(true);
    try {
      if (this.list && this.block.data) {
        const token = await this.auth.refreshToken();
        const blockId = this.block.data.id;
        const data = await this.serviceQuestion.checkQuestions(blockId, token);
        await this.getList();
        await this.clearChanges();
        await this.block.getData(blockId);
        this.block.changeTab(BlockTabNames.questions);
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
