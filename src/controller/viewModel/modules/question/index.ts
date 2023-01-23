import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { IQuestionViewModel } from '@viewModel/modules/question/interface';
import { IQuestionDTO } from '@model/question';
import { QuestionService } from '@service/modules/question';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockViewModel } from '@viewModel/modules/block';
import { action, computed, makeObservable, observable } from 'mobx';
import { guid } from '@utils/guid/guid';
import { AuthViewModel } from '@viewModel/modules/auth';

@injectable()
export class QuestionViewModel
  extends BaseCardViewModel<IQuestionDTO>
  implements IQuestionViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: QuestionService;

  @inject(VIEW_MODEL.Auth) protected auth!: AuthViewModel;

  @inject(VIEW_MODEL.Block) protected block!: BlockViewModel;

  constructor() {
    super();
    makeObservable(this, {
      option: observable,
      setOption: action,
      hasOption: computed,

      addOption: action,
      removeOption: action,

      addOptionCorrect: action,
      removeOptionCorrect: action,
    });
    this.setValidations([
      { nameSpace: 'blockId', type: 'required', message: 'Required' },
      { nameSpace: 'title', type: 'required', message: 'Required' },
      { nameSpace: 'options', type: 'required', message: 'Required' },
      { nameSpace: 'optionsCorrectId', type: 'required', message: 'Required' },
    ]);
  }

  // --- options

  option?: string = undefined;

  setOption = (value?: string) => {
    this.option = value;
  };

  get hasOption() {
    return Boolean(this.option);
  }

  addOption = () => {
    if (this.option) {
      const data = this.modalData;
      const index = data?.options ? data?.options.length : 0;
      const value = { id: guid(), title: this.option };
      this.changeModalField(`options.${index}`, value);
      this.validateModal();
      this.setOption();
    }
  };

  removeOption = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data && data.options) {
      data.options = data.options.filter((d) => d.id !== id);
      if (data.options.length === 0) data.options = undefined;
      this.setModalData(data);
      this.validateModal();
    }
  };

  addOptionCorrect = (id: string) => {
    const data = this.modalData;
    const index = data?.optionsCorrectId ? data?.optionsCorrectId.length : 0;
    this.changeModalField(`optionsCorrectId.${index}`, id);
    this.validateModal();
  };

  removeOptionCorrect = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data && data.optionsCorrectId) {
      data.optionsCorrectId = data.optionsCorrectId.filter((d) => d !== id);
      if (data.optionsCorrectId.length === 0) data.optionsCorrectId = undefined;
      this.setModalData(data);
      this.validateModal();
    }
  };

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.getQuestions(
          { blockId: this.block.data.id },
          token
        );
        if (data) this.setList(data);
      }
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id: string) => {
    this.setModalLoading(true);
    try {
      const token = await this.auth.refreshToken();
      const data = await this.serviceQuestion.getQuestion(id, undefined, token);
      if (data) {
        this.setModalData(data);
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        this.changeModalField('blockId', this.block.data?.id);
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.saveQuestion(
          this.modalData,
          token
        );
        if (data) {
          this.updateFromList(data);
          await this.clearModalChanges();
        }
        return data;
      }
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        const token = await this.auth.refreshToken();
        const data = await this.serviceQuestion.deleteQuestions(
          this.deleteIds,
          token
        );
        if (data) {
          this.removeFromList(this.deleteIds);
          await this.clearDelete();
          await this.clearData();
        }
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
