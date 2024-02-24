import _ from 'lodash';
import { ParsedUrlQuery } from 'querystring';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IQuestionUserDTO } from '@model/entities/question';
import { action, computed, makeObservable, observable } from 'mobx';
import { BaseCardStore } from '@store/modules/base/card';
import { ITestStatus } from '@store/modules/_/question/base/interface';
import type IQuestionBaseStore from '@store/modules/_/question/base/interface';
import type IQuestionService from '@service/modules/entities/question/interface';

@injectable()
export class QuestionBaseStore
  extends BaseCardStore<IQuestionUserDTO>
  implements IQuestionBaseStore
{
  @inject(SERVICE.Question) protected serviceQuestion!: IQuestionService;

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
              item.question?.title.toLowerCase().includes((query.filter as string).toLowerCase()));
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
    if (this.isPrev && this.index !== undefined && !this.isListLoading && !this.isDataLoading) {
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
