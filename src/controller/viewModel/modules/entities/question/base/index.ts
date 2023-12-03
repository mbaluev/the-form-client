import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { IQuestionUserDTO } from '@model/entities/question';
import { QuestionService } from 'controller/service/modules/entities/question';
import { ITestStatus } from '@viewModel/modules/entities/question/user/interface';
import { action, computed, makeObservable, observable } from 'mobx';
import { IQuestionBaseViewModel } from '@viewModel/modules/entities/question/base/interface';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

@injectable()
export class QuestionBaseViewModel
  extends BaseCardViewModel<IQuestionUserDTO>
  implements IQuestionBaseViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: QuestionService;

  constructor() {
    super();
    makeObservable(this, {
      status: computed,
      isNext: computed,
      isPrev: computed,

      index: observable,
      setIndex: action,

      start: action,
      stop: action,
      prev: action,
      next: action,
    });
  }

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IQuestionUserDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'question.title')) {
          result =
            result ||
            (item.question?.title !== undefined &&
              item.question?.title !== null &&
              item.question?.title
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  async getData(id?: string, query?: ParsedUrlQuery, setIndex?: boolean) {
    console.log('getData', id, query, setIndex);
  }

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
}
