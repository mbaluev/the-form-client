import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { ParsedUrlQuery } from 'querystring';
import { IQuestionDTO } from '@model/entities/question';
import type IBlockItemStore from '@store/modules/entities/block/item/interface';
import type IQuestionListStore from '@store/modules/entities/question/list/interface';
import type IQuestionService from '@service/modules/entities/question/interface';

@injectable()
export class QuestionListStore extends BaseListStore<IQuestionDTO> implements IQuestionListStore {
  @inject(SERVICE.Question) private questionService!: IQuestionService;

  @inject(STORE.BlockItem) private blockItemStore!: IBlockItemStore;

  getData = async (query?: ParsedUrlQuery) => {
    this.setData();
    this.setLoading(true);
    try {
      const data = await this.questionService.getQuestions(query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data?.filter((d) => {
      return d.title?.toLowerCase()?.includes(searchText || '');
    });
  }

  deleteSubmit = async () => {
    if (this.selectedItems && this.hasSelected) {
      this.setDeleteLoading(true);
      try {
        const res = await this.questionService.deleteQuestions(this.selectedItems);
        if (this.blockItemStore.data) await this.getData({ blockId: this.blockItemStore.data.id });
        this.setDeleteOpen(false);
        return res;
      } catch (err) {
      } finally {
        this.setDeleteLoading(false);
      }
    }
  };

  filterName = 'query_questions';
}
