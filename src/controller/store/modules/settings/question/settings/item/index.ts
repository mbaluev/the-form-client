import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { STORE } from '@store/ids';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { IQuestionDTO } from '@model/entities/question';
import type IQuestionSettingsItemStore from '@store/modules/settings/question/settings/item/interface';
import type IQuestionService from '@service/modules/entities/question/interface';
import type IQuestionSettingsListStore from '@store/modules/settings/question/settings/list/interface';

@injectable()
export class QuestionSettingsItemStore
  extends BaseCardStore<IQuestionDTO>
  implements IQuestionSettingsItemStore
{
  @inject(SERVICE.Question) private questionService!: IQuestionService;

  @inject(STORE.QuestionSettingsList) private materialListStore!: IQuestionSettingsListStore;

  // --- override

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalData();
    this.setModalLoading(true);
    try {
      const data = await this.questionService.getQuestion(id, query);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async (data?: IQuestionDTO) => {
    if (data) {
      this.setSaveLoading(true);
      try {
        const res = await this.questionService.saveQuestion(data);
        await this.materialListStore.getData({ blockId: data.blockId });
        return res;
      } catch (err) {
      } finally {
        this.setSaveLoading(false);
      }
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    if (this.deleteIds) {
      this.setDeleteLoading(true);
      try {
        await this.questionService.deleteQuestions(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      } catch (err) {
        return false;
      } finally {
        this.setDeleteLoading(false);
      }
    }
  };
}
