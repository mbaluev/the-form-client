import { inject, injectable } from 'inversify';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { QuestionBaseViewModel } from '@viewModel/modules/entities/question/base';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class QuestionAdminViewModel
  extends QuestionBaseViewModel
  implements IQuestionAdminViewModel
{
  @inject(VIEW_MODEL.BlockAdmin) protected userBlock!: IBlockAdminViewModel;

  constructor() {
    super();
    this.setValidations([
      { nameSpace: 'commentText', type: 'required', message: 'Required' },
    ]);
  }

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearData();
    this.setListLoading(true);
    try {
      if (this.userBlock.data) {
        const data = await this.serviceQuestion.getQuestionsAdmin({
          userBlockId: this.userBlock.data.id,
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
        if (this.userBlock.data) {
          const blockId = this.userBlock.data.id;
          await this.userBlock.getData(blockId);
        }
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
    return undefined;
  };
}
