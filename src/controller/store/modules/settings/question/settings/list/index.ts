import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { ParsedUrlQuery } from 'querystring';
import { IQuestionDTO } from '@model/entities/question';
import type IBlockSettingsItemStore from '@store/modules/settings/block/settings/item/interface';
import type IQuestionSettingsListStore from '@store/modules/settings/question/settings/list/interface';
import type IQuestionService from '@service/modules/entities/question/interface';

@injectable()
export class QuestionSettingsListStore
  extends BaseListStore<IQuestionDTO>
  implements IQuestionSettingsListStore
{
  @inject(SERVICE.Question) private questionService!: IQuestionService;

  @inject(STORE.BlockSettingsItem) private blockItemStore!: IBlockSettingsItemStore;

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
