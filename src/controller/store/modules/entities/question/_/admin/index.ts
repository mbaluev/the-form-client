import { inject, injectable } from 'inversify';
import { ParsedUrlQuery } from 'querystring';
import { QuestionBaseStore } from '@store/modules/entities/question/_/base';
import { STORE } from '@store/ids';
import type IQuestionAdminStore from '@store/modules/entities/question/_/admin/interface';
import type IBlockAdminStore from '@store/modules/entities/block/_/admin/interface';

@injectable()
export class QuestionAdminStore extends QuestionBaseStore implements IQuestionAdminStore {
  @inject(STORE.BlockAdmin) protected blockAdminStore!: IBlockAdminStore;

  constructor() {
    super();
    this.setValidations([{ nameSpace: 'commentText', type: 'required', message: 'Required' }]);
  }

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.blockAdminStore.data) {
        const data = await this.serviceQuestion.getQuestionsAdmin({
          userBlockId: this.blockAdminStore.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getData = async (id?: string, query?: ParsedUrlQuery, setIndex?: boolean) => {
    this.setDataLoading(true);
    if (id && setIndex) this.setIndex(this.getIndexById(id));
    try {
      const data = await this.serviceQuestion.getQuestionAdmin(id, query);
      this.setData(data);
    } catch (err) {
    } finally {
      this.setDataLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        await this.serviceQuestion.saveQuestionComment(
          this.modalData.userBlockId,
          this.modalData.id,
          this.modalData.commentText
        );
        await this.clearModalChanges();
        if (this.blockAdminStore.data) {
          const blockId = this.blockAdminStore.data.id;
          await this.blockAdminStore.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
    return undefined;
  };
}
