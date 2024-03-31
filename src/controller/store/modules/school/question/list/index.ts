import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { BaseListStore } from '@store/modules/base/list';
import { IQuestionUserDTO } from '@model/entities/question';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';
import type IQuestionSchoolListStore from '@store/modules/school/question/list/interface';
import type IQuestionService from '@service/modules/entities/question/interface';

@injectable()
export class QuestionSchoolListStore
  extends BaseListStore<IQuestionUserDTO>
  implements IQuestionSchoolListStore
{
  @inject(SERVICE.Question) private questionService!: IQuestionService;

  @inject(STORE.BlockSchoolItem) protected blockUserStore!: IBlockSchoolItemStore;

  getData = async () => {
    this.setData();
    this.setLoading(true);
    try {
      if (this.blockUserStore.data) {
        const data = await this.questionService.getQuestionsUser({
          userBlockId: this.blockUserStore.data.id,
        });
        this.setData(data);
      }
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };

  get dataFiltered() {
    const searchText = this.filterStore.filters[this.filterName]?.toLowerCase();
    return this.data?.filter((d) => {
      return d.question?.title?.toLowerCase()?.includes(searchText || '');
    });
  }

  filterName = 'query_question_school';
}
