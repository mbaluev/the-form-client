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

@injectable()
export class QuestionViewModel
  extends BaseCardViewModel<IQuestionDTO>
  implements IQuestionViewModel
{
  @inject(SERVICE.Question) protected serviceQuestion!: QuestionService;

  @inject(VIEW_MODEL.Block) protected block!: BlockViewModel;

  constructor() {
    super();
    makeObservable(this, {
      option: observable,
      setOption: action,
      addOption: action,
      addOptionCorrect: action,
      removeOption: action,
      removeOptionCorrect: action,
      hasOption: computed,
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

  addOptionCorrect = (id: string) => {
    const data = this.modalData;
    const index = data?.optionsCorrectId ? data?.optionsCorrectId.length : 0;
    this.changeModalField(`optionsCorrectId.${index}`, id);
    this.validateModal();
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

  removeOptionCorrect = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data && data.optionsCorrectId) {
      data.optionsCorrectId = data.optionsCorrectId.filter((d) => d !== id);
      if (data.optionsCorrectId.length === 0) data.optionsCorrectId = undefined;
      this.setModalData(data);
      this.validateModal();
    }
  };

  get hasOption() {
    return Boolean(this.option);
  }

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.block.data) {
        const data = await this.serviceQuestion.getQuestions(
          this.block.data.id
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
      const data = await this.serviceQuestion.getQuestion(id);
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
        const data = await this.serviceQuestion.saveQuestion(this.modalData);
        this.updateFromList(data);
        await this.clearModalChanges();
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
        await this.serviceQuestion.deleteQuestions(this.deleteIds);
        this.removeFromList(this.deleteIds);
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
