import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IQuestionUserDTO } from '@model/entities/question';
import type IQuestionSchoolItemStore from '@store/modules/school/question/item/interface';
import type IQuestionService from '@service/modules/entities/question/interface';

@injectable()
export class QuestionSchoolItemStore
  extends BaseCardStore<IQuestionUserDTO>
  implements IQuestionSchoolItemStore
{
  @inject(SERVICE.Question) private questionService!: IQuestionService;

  // --- override

  getData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setDataLoading(true);
    try {
      const data = await this.questionService.getQuestionUser(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };
}
