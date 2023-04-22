import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IQuestionUserDTO } from '@model/question';
import { QuestionService } from '@service/modules/question';
import { VIEW_MODEL } from '@viewModel/ids';
import { AuthViewModel } from '@viewModel/modules/auth';
import {
  IQuestionUserViewModel,
  ITestStatus,
} from '@viewModel/modules/question/user/interface';
import { BlockUserViewModel } from '@viewModel/modules/block/user';
import { action, computed, makeObservable, observable } from 'mobx';

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
      play: computed,
      prev: action,
      next: action,
      repeat: action,
      finish: action,
      expand: action,
      changeAnswer: action,
      checkAnswers: action,
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
        if (data) data[0].expanded = true;
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  // --- actions

  index?: number = undefined;

  setIndex = (value?: number) => {
    this.index = value;
  };

  get status() {
    const status: ITestStatus = {
      code: 'new',
      total: 0,
      complete: 0,
      fail: 0,
    };
    if (this.list) {
      status.total = this.list.length;
      status.complete = this.list.filter((d) => d.complete === true).length;
      status.fail = this.list.filter((d) => d.complete === false).length;
      if (status.fail > 0) status.code = 'fail';
      if (status.complete === status.total) status.code = 'success';
    }
    return status;
  }

  get play() {
    return this.index !== undefined;
  }

  prev = () => {
    if (this.index !== undefined) {
      const index = this.index > 0 ? this.index - 1 : 0;
      this.setIndex(index);
      this.expand(index);
    }
  };

  next = () => {
    if (this.index !== undefined && this.list) {
      const index =
        this.index < this.list.length - 1 ? this.index + 1 : this.index;
      this.setIndex(index);
      this.expand(index);
    }
  };

  repeat = () => {
    this.setIndex(0);
    this.expand(0);
  };

  finish = () => {
    this.setIndex();
    this.expand(0);
    this.checkAnswers();
  };

  expand = (index: number) => {
    if (this.list) {
      const newList = [...this.list];
      newList.forEach((q, i) => (q.expanded = i === index));
      this.setList(newList);
    }
  };

  changeAnswer = (questionId: string, optionId: string, checked: boolean) => {
    if (this.list) {
      const newList = [...this.list];
      newList.forEach((q) => {
        if (q.id === questionId) {
          if (checked) {
            q.answers.push(optionId);
          } else {
            q.answers = q.answers.filter((a) => a !== optionId);
          }
        }
      });
      this.setList(newList);
    }
  };

  checkAnswers = async () => {
    this.setDataLoading(true);
    try {
      if (this.list && this.block.data) {
        const token = await this.auth.refreshToken();
        const blockId = this.block.data.id;
        const questions = this.list.map((q) => ({
          id: q.id,
          answers: q.answers,
        }));
        const data = await this.serviceQuestion.checkAnswers(
          blockId,
          questions,
          token
        );
        await this.getList();
        await this.clearChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
