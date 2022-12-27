import { injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import { ParsedUrlQuery } from 'querystring';
import objectPath from 'object-path';
import _ from 'lodash';
import {
  IBaseCardError,
  IBaseCardField,
  IBaseCardType,
  IBaseCardValidation,
  IBaseCardViewModel,
} from '@viewModel/modules/baseCard/interfaces';

@injectable()
export class BaseCardViewModel<T extends IBaseCardType>
  implements IBaseCardViewModel<T>
{
  constructor() {
    makeObservable(this, {
      // --- list

      list: observable,
      isListLoading: observable,
      setList: action,
      setListLoading: action,
      updateFromList: action,
      removeFromList: action,
      hasList: computed,

      // --- data

      data: observable,
      isDataLoading: observable,
      setData: action,
      setDataLoading: action,
      hasData: computed,

      // --- filter

      filter: observable,
      setFilter: action,
      listFiltered: computed,
      hasListFiltered: computed,

      // --- override

      getList: action,
      getData: action,
      saveData: action,
      deleteData: action,

      getModalData: action,
      saveModalData: action,

      // --- edit

      modalData: observable,
      isModalOpen: observable,
      isModalLoading: observable,
      setModalData: action,
      setModalOpen: action,
      setModalLoading: action,
      modalNew: action,
      modalOpen: action,
      modalClose: action,
      modalSubmit: action,

      // --- delete

      isDeleteOpen: observable,
      isDeleteLoading: observable,
      deleteIds: observable,
      setDeleteOpen: action,
      setDeleteLoading: action,
      setDeleteIds: action,
      addDeleteId: action,
      removeDeleteId: action,
      deleteOpen: action,
      deleteClose: action,
      deleteSubmit: action,
      hasDelete: computed,

      // --- expand

      isListExpanded: observable,
      setListExpanded: observable,
      expandData: action,
      expandList: action,

      // --- changes

      fields: observable,
      setFields: observable,
      changeField: action,
      hasChanges: computed,

      modalFields: observable,
      setModalFields: action,
      changeModalField: action,
      hasModalChanges: computed,

      // --- errors

      errors: observable,
      setErrors: action,
      setError: action,
      removeError: action,
      getError: action,
      hasErrors: computed,

      modalErrors: observable,
      setModalErrors: action,
      setModalError: action,
      removeModalError: action,
      getModalError: action,
      hasModalErrors: computed,

      // --- validations

      validations: observable,
      setValidations: action,
      validateField: action,
      validate: action,
      validateModal: action,

      // --- clear

      clearList: action,
      clearData: action,
      clearModalData: action,
      clearChanges: action,
      clearDelete: action,
    });
  }

  // --- list

  list?: T[] | null = undefined;

  isListLoading = false;

  setList = (data?: T[] | null) => {
    this.list = data;
  };

  setListLoading = (value: boolean) => {
    this.isListLoading = value;
  };

  updateFromList = (data: T) => {
    const item = this.list?.find((d) => d.id === data.id);
    const list = this.list ? [...this.list] : undefined;
    if (item) {
      if (list) {
        const newList = list.map((d) => {
          if (d.id === data.id) {
            d = { ...data };
          }
          return d;
        });
        this.setList(newList);
      }
    } else {
      if (list) {
        const newList = [...list];
        newList.push(data);
        this.setList(newList);
      } else {
        const newList = [data];
        this.setList(newList);
      }
    }
  };

  removeFromList = (ids: string[]) => {
    const list = this.list ? [...this.list] : undefined;
    const newList = list?.filter((item) => !ids.includes(item.id));
    this.setList(newList);
  };

  get hasList() {
    return Boolean(this.list && this.list.length > 0);
  }

  // --- data

  data?: T | null = undefined;

  isDataLoading = false;

  setData = (data?: T | null) => {
    this.data = data;
  };

  setDataLoading = (value: boolean) => {
    this.isDataLoading = value;
  };

  get hasData() {
    return Boolean(this.data);
  }

  // --- filter

  filter?: string = undefined;

  setFilter = (value?: string) => {
    this.filter = value;
  };

  filterByQuery =
    (query?: ParsedUrlQuery) =>
    (item: T): boolean => {
      let result = false;
      const filter = query?.filter;
      if (filter) {
        if (_.has(item, 'title')) {
          result =
            result ||
            (item.title !== undefined &&
              item.title
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'name')) {
          result =
            result ||
            (item.name !== undefined &&
              item.name
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
        if (_.has(item, 'description')) {
          result =
            result ||
            (item.description !== undefined &&
              item.description
                .toLowerCase()
                .includes((query.filter as string).toLowerCase()));
        }
      } else {
        result = true;
      }
      return result;
    };

  get listFiltered() {
    const query = { filter: this.filter };
    return this.list?.filter(this.filterByQuery(query));
  }

  get hasListFiltered() {
    return Boolean(this.listFiltered && this.listFiltered.length > 0);
  }

  // --- override

  async getList(query?: ParsedUrlQuery) {
    console.log('getList', query);
  }

  async getData(id: string) {
    console.log('getData', id);
  }

  async saveData(): Promise<T | null | undefined> {
    return this.data;
  }

  async deleteData(): Promise<boolean | undefined> {
    return undefined;
  }

  async getModalData(id: string) {
    console.log('getModalData', id);
  }

  async saveModalData(): Promise<T | null | undefined> {
    return this.modalData;
  }

  // --- modal

  modalData?: T | null = undefined;

  isModalOpen = false;

  isModalLoading = false;

  setModalData = (data?: T | null) => {
    this.modalData = data;
  };

  setModalOpen = (value: boolean) => {
    this.isModalOpen = value;
  };

  setModalLoading = (value: boolean) => {
    this.isModalLoading = value;
  };

  modalNew = async () => {
    await this.clearModalData();
    await this.clearModalChanges();
    this.setModalOpen(true);
    this.validateModal();
  };

  modalOpen = async (id?: string) => {
    if (id) {
      await this.clearModalData();
      await this.clearModalChanges();
      this.setModalOpen(true);
      await this.getModalData(id);
      this.validateModal();
    }
  };

  modalClose = async () => {
    await this.clearModalData();
    await this.clearModalChanges();
    this.setModalOpen(false);
  };

  modalSubmit = async () => {
    this.validateModal();
    if (!this.hasErrors) {
      const data = await this.saveModalData();
      await this.modalClose();
      return data;
    }
  };

  // --- delete ----

  isDeleteOpen = false;

  isDeleteLoading = false;

  deleteIds?: string[] = undefined;

  setDeleteOpen = (value: boolean) => {
    this.isDeleteOpen = value;
  };

  setDeleteLoading = (value: boolean) => {
    this.isDeleteLoading = value;
  };

  setDeleteIds = (value?: string[]) => {
    this.deleteIds = value;
  };

  addDeleteId = (id?: string) => {
    if (id) {
      const deleteIds = this.deleteIds ? [...this.deleteIds] : undefined;
      if (deleteIds) {
        const newDeleteIds = [...deleteIds];
        newDeleteIds.push(id);
        this.setDeleteIds(newDeleteIds);
      } else {
        const newDeleteIds = [id];
        this.setDeleteIds(newDeleteIds);
      }
    }
  };

  removeDeleteId = (id?: string) => {
    const deleteIds = this.deleteIds?.filter((d) => d !== id);
    const newDeleteIds =
      deleteIds && deleteIds.length > 0 ? deleteIds : undefined;
    this.setDeleteIds(newDeleteIds);
  };

  deleteOpen = async () => {
    if (this.deleteIds) this.setDeleteOpen(true);
  };

  deleteClose = async () => {
    this.setDeleteIds();
    this.setDeleteOpen(false);
  };

  deleteSubmit = async () => {
    const data = await this.deleteData();
    await this.deleteClose();
    return data;
  };

  get hasDelete() {
    return Boolean(this.deleteIds && this.deleteIds.length > 0);
  }

  // --- expand

  isListExpanded = true;

  setListExpanded = (value: boolean) => {
    this.isListExpanded = value;
  };

  expandData = (data: T) => {
    if (this.list) {
      let isListExpanded = true;
      const list = [...this.list];
      list.forEach((d) => {
        if (_.has(d, 'expanded')) {
          if (d.id === data.id) d.expanded = !data.expanded;
          if (!d.expanded) isListExpanded = false;
        }
      });
      this.setList(list);
      this.setListExpanded(isListExpanded);
    }
  };

  expandList = () => {
    const isListExpanded = !this.isListExpanded;
    if (this.list) {
      const list = [...this.list];
      list.forEach((d) => {
        if (_.has(d, 'expanded')) {
          d.expanded = isListExpanded;
        }
      });
      this.setList(list);
    }
    this.setListExpanded(isListExpanded);
  };

  // --- fields

  fields?: IBaseCardField[] = undefined;

  setFields = (data?: IBaseCardField[]) => {
    this.fields = data;
  };

  changeField = (nameSpace: string, value?: any): void => {
    const newValue = value;

    // --- set fields
    const fields = this.fields ? [...this.fields] : [];
    const field = fields.find((f) => f.nameSpace === nameSpace);
    if (field) {
      field.value = newValue;
    } else {
      fields.push({
        value: newValue,
        nameSpace: nameSpace,
      });
    }
    this.setFields(fields);

    // --- validation
    this.validateField(nameSpace, value);

    // --- set data
    const data = this.data ? { ...this.data } : {};
    objectPath.set(data, nameSpace, newValue);
    this.setData(data as T);
  };

  get hasChanges() {
    return Boolean(this.fields && this.fields.length > 0);
  }

  modalFields?: IBaseCardField[] = undefined;

  setModalFields = (data?: IBaseCardField[]) => {
    this.modalFields = data;
  };

  changeModalField = (nameSpace: string, value?: any): void => {
    const newValue = value;

    // --- set fields
    const fields = this.modalFields ? [...this.modalFields] : [];
    const field = fields.find((f) => f.nameSpace === nameSpace);
    if (field) {
      field.value = newValue;
    } else {
      fields.push({
        value: newValue,
        nameSpace: nameSpace,
      });
    }
    this.setModalFields(fields);

    // --- validation
    this.validateModalField(nameSpace, value);

    // --- set data
    const data = this.modalData ? { ...this.modalData } : {};
    objectPath.set(data, nameSpace, newValue);
    this.setModalData(data as T);
  };

  get hasModalChanges() {
    return Boolean(this.modalFields && this.modalFields.length > 0);
  }

  // --- errors

  errors?: IBaseCardError[] = undefined;

  setErrors = (data?: IBaseCardError[]) => {
    this.errors = data;
  };

  setError = (nameSpace: string, message: string, value?: any) => {
    const errors = this.errors ? [...this.errors] : [];
    const error = errors.find((e) => e.nameSpace === nameSpace);
    if (error) {
      error.value = value;
      error.message = message;
    } else {
      errors.push({
        nameSpace,
        message,
        value,
      });
    }
    this.setErrors(errors);
  };

  removeError = (nameSpace: string) => {
    const errors = this.errors ? [...this.errors] : [];
    const newErrors = errors.filter((e) => e.nameSpace !== nameSpace);
    this.setErrors(newErrors);
  };

  getError = (nameSpace: string) => {
    return this.errors?.find((e) => e.nameSpace === nameSpace);
  };

  get hasErrors() {
    return Boolean(this.errors && this.errors.length > 0);
  }

  modalErrors?: IBaseCardError[] = undefined;

  setModalErrors = (data?: IBaseCardError[]) => {
    this.modalErrors = data;
  };

  setModalError = (nameSpace: string, message: string, value?: any) => {
    const errors = this.modalErrors ? [...this.modalErrors] : [];
    const error = errors.find((e) => e.nameSpace === nameSpace);
    if (error) {
      error.value = value;
      error.message = message;
    } else {
      errors.push({
        nameSpace,
        message,
        value,
      });
    }
    this.setModalErrors(errors);
  };

  removeModalError = (nameSpace: string) => {
    const errors = this.modalErrors ? [...this.modalErrors] : [];
    const newErrors = errors.filter((e) => e.nameSpace !== nameSpace);
    this.setModalErrors(newErrors);
  };

  getModalError = (nameSpace: string) => {
    return this.modalErrors?.find((e) => e.nameSpace === nameSpace);
  };

  get hasModalErrors() {
    return Boolean(this.modalErrors && this.modalErrors.length > 0);
  }

  // --- validations

  validations?: IBaseCardValidation[] = undefined;

  setValidations = (data?: IBaseCardValidation[]) => {
    this.validations = data;
  };

  validateField = (nameSpace: string, value?: any) => {
    this.validations?.forEach((validation) => {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (validation.nameSpace === nameSpace) {
        // eslint-disable-next-line sonarjs/no-collapsible-if
        if (validation.type === 'required') {
          if (value) {
            this.removeError(nameSpace);
          } else {
            this.setError(nameSpace, validation.message, value);
          }
        }
      }
    });
  };

  validate = () => {
    this.validations?.forEach((validation) => {
      const data = this.data ? { ...this.data } : {};
      const value = objectPath.get(data, validation.nameSpace);
      this.validateField(validation.nameSpace, value);
    });
  };

  validateModalField = (nameSpace: string, value?: any) => {
    this.validations?.forEach((validation) => {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (validation.nameSpace === nameSpace) {
        // eslint-disable-next-line sonarjs/no-collapsible-if
        if (validation.type === 'required') {
          if (value) {
            this.removeModalError(nameSpace);
          } else {
            this.setModalError(nameSpace, validation.message, value);
          }
        }
      }
    });
  };

  validateModal = () => {
    this.validations?.forEach((validation) => {
      const data = this.modalData ? { ...this.modalData } : {};
      const value = objectPath.get(data, validation.nameSpace);
      this.validateModalField(validation.nameSpace, value);
    });
  };

  // -- clear

  clearList = async () => {
    try {
      this.setList();
    } finally {
    }
  };

  clearData = async () => {
    try {
      this.setData();
    } finally {
    }
  };

  clearModalData = async () => {
    try {
      this.setModalData();
    } finally {
    }
  };

  clearChanges = async () => {
    try {
      this.setFields();
      this.setErrors();
    } finally {
    }
  };

  clearModalChanges = async () => {
    try {
      this.setModalFields();
      this.setModalErrors();
    } finally {
    }
  };

  clearDelete = async () => {
    try {
      this.setDeleteIds();
    } finally {
    }
  };
}
