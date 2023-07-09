/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { inject, injectable } from 'inversify';
import { BaseCardViewModel } from 'controller/viewModel/modules/base/baseCard';
import { SERVICE } from '@service/ids';
import { VIEW_MODEL } from '@viewModel/ids';
import { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { IQuestionAdminDTO } from '@model/entities/question';
import { IQuestionService } from '@service/modules/entities/question/interface';
import { IAuthViewModel } from '@viewModel/modules/common/auth/interface';

@injectable()
export class QuestionAdminViewModel
  extends BaseCardViewModel<IQuestionAdminDTO>
  implements IQuestionAdminViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: IQuestionService;

  @inject(VIEW_MODEL.Auth) protected auth!: IAuthViewModel;

  // --- override

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: IQuestionAdminDTO): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'user.firstname')) {
          result =
            result ||
            (item.user.firstname !== undefined &&
              item.user.firstname !== null &&
              item.user.firstname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.lastname')) {
          result =
            result ||
            (item.user.lastname !== undefined &&
              item.user.lastname !== null &&
              item.user.lastname
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'user.username')) {
          result =
            result ||
            (item.user.username !== undefined &&
              item.user.username !== null &&
              item.user.username
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'question.document.name')) {
          result =
            result ||
            (item.question.block.name !== undefined &&
              item.question.block.name !== null &&
              item.question.block.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  getList = async () => {
    this.setListLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceQuestion.getQuestionsAdmin(
        undefined,
        token
      );
      this.setList(data);
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id: string) => {
    this.setDataLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceQuestion.getQuestionAdmin(
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
}
