import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { IQuestionDTO } from '@model/entities/question';
import { action, computed, makeObservable, observable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import { BaseCardStore } from '@store/modules/base/card';
import { STORE } from '@store/ids';
import { v4 } from 'uuid';
import type IQuestionStore from '@store/modules/entities/question/interface';
import type IQuestionService from '@service/modules/entities/question/interface';
import type IBlockStore from '@store/modules/entities/block/_/interface';

@injectable()
export class QuestionStore extends BaseCardStore<IQuestionDTO> implements IQuestionStore {
  @inject(SERVICE.Question) protected serviceQuestion!: IQuestionService;

  @inject(STORE.Block) protected blockStore!: IBlockStore;

  constructor() {
    super();
    makeObservable(this, {
      option: observable,
      setOption: action,
      hasOption: computed,

      addOption: action,
      removeOption: action,
      changeOptionCorrect: action,
    });
    this.setValidations([
      { nameSpace: 'blockId', type: 'required', message: 'Required' },
      { nameSpace: 'title', type: 'required', message: 'Required' },
      { nameSpace: 'position', type: 'required', message: 'Required' },
      { nameSpace: 'questionOptions', type: 'required', message: 'Required' },
      { nameSpace: 'questionOptions.[].correct', type: 'any', message: '' },
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
      const index = data?.questionOptions ? data?.questionOptions.length : 0;
      const value = { id: v4(), title: this.option };
      this.changeModalField(`questionOptions.${index}`, value);
      this.validateModal();
      this.setOption();
    }
  };

  removeOption = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data && data.questionOptions) {
      data.questionOptions = data.questionOptions.filter((d) => d.id !== id);
      this.setModalData(data);
      this.validateModal();
    }
  };

  changeOptionCorrect = (id: string, value: boolean) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data && data.questionOptions) {
      const index = data?.questionOptions.findIndex((d) => d.id === id);
      this.changeModalField(`questionOptions.${index}.correct`, value);
      if (value) this.addOptionCorrect(id);
      else this.removeOptionCorrect(id);
      this.validateModal();
    }
  };

  addOptionCorrect = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data) {
      data.questionOptions?.forEach((d) => {
        if (d.id === id) d.correct = true;
      });
      this.setModalData(data);
    }
  };

  removeOptionCorrect = (id: string) => {
    const data = this.modalData ? { ...this.modalData } : undefined;
    if (data) {
      data.questionOptions?.forEach((d) => {
        if (d.id === id) d.correct = false;
      });
      this.setModalData(data);
    }
  };

  // --- override

  getList = async () => {
    await this.clearList();
    await this.clearDelete();
    this.setListLoading(true);
    try {
      if (this.blockStore.data) {
        const data = await this.serviceQuestion.getQuestions({
          blockId: this.blockStore.data.id,
        });
        this.setList(data);
      }
    } catch (err) {
    } finally {
      this.setListLoading(false);
    }
  };

  getModalData = async (id?: string, query?: ParsedUrlQuery) => {
    this.setModalLoading(true);
    try {
      const data = await this.serviceQuestion.getQuestion(id, query);
      this.setModalData(data);
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  saveModalData = async () => {
    this.setModalLoading(true);
    try {
      if (this.modalData && !this.hasModalErrors) {
        this.changeModalField('blockId', this.blockStore.data?.id);
        const data = await this.serviceQuestion.saveQuestion(this.modalData);
        await this.getList();
        await this.clearModalChanges();
        return data;
      }
    } catch (err) {
    } finally {
      this.setModalLoading(false);
    }
  };

  deleteData = async (): Promise<boolean | undefined> => {
    this.setDeleteLoading(true);
    try {
      if (this.deleteIds) {
        await this.serviceQuestion.deleteQuestions(this.deleteIds);
        await this.getList();
        await this.clearDelete();
        await this.clearData();
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
