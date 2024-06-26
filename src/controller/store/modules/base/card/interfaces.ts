import { ParsedUrlQuery } from 'querystring';

export interface IBaseCardError {
  nameSpace: string;
  message: string;
  value?: any;
}

export interface IBaseCardField {
  nameSpace: string;
  value?: any;
}

export interface IBaseCardValidation {
  nameSpace: string;
  type: 'required' | 'email' | 'link' | 'any';
  message: string;
  condition?: () => boolean;
}

export type IBaseCardType = {
  id: string;
  expanded?: boolean;
  title?: string;
  name?: string;
  description?: string;
};

export default interface IBaseCardStore<T extends IBaseCardType> {
  // --- list

  list?: T[] | null;
  isListLoading: boolean;
  setList: (data?: T[] | null) => void;
  updateFromList: (data: T) => void;
  removeFromList: (ids: string[]) => void;
  hasList: boolean;

  // --- data

  data?: T | null;
  isDataLoading: boolean;
  setData: (data?: T | null) => void;
  hasData: boolean;

  // ---- save

  isSaveLoading: boolean;
  setSaveLoading: (value: boolean) => void;

  // --- filter

  filter?: string;
  setFilter: (value?: string) => void;
  listFiltered?: T[] | null;
  hasListFiltered: boolean;

  // --- override

  getList: (query?: ParsedUrlQuery) => Promise<void>;
  getData: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
  getModalData: (id?: string, query?: ParsedUrlQuery) => Promise<void>;
  saveData: (data?: T) => Promise<T | null | undefined>;
  saveModalData: (data?: T) => Promise<T | null | undefined>;
  deleteData: () => Promise<boolean | undefined>;

  // --- edit

  modalData?: T | null;
  isModalOpen: boolean;
  isModalLoading: boolean;
  setModalData: (data?: T | null) => void;
  modalNew: () => Promise<void>;
  modalOpen: (id?: string) => Promise<void>;
  modalClose: () => Promise<void>;
  modalSubmit: () => Promise<T | null | undefined>;
  hasModalData: boolean;

  // --- delete

  isDeleteOpen: boolean;
  isDeleteLoading: boolean;
  deleteIds?: string[];
  addDeleteId: (id?: string) => void;
  removeDeleteId: (id?: string) => void;
  deleteOpen: () => Promise<void>;
  deleteClose: () => Promise<void>;
  deleteSubmit: () => Promise<boolean | undefined>;
  hasDelete: boolean;

  // --- expand

  isListExpanded: boolean;
  expandData: (data: T) => void;
  expandList: () => void;

  // --- changes

  changeField: (nameSpace: string, value?: any) => void;
  changeModalField: (nameSpace: string, value?: any) => void;
  hasChanges: boolean;
  hasModalChanges: boolean;

  // --- errors

  getError: (nameSpace: string) => IBaseCardError | undefined;
  getModalError: (nameSpace: string) => IBaseCardError | undefined;
  hasErrors: boolean;
  hasModalErrors: boolean;

  // --- validations

  validate: (nameSpaces?: string[]) => boolean;
  validateModal: (nameSpaces?: string[]) => boolean;

  // --- clear

  clearList: () => Promise<void>;
  clearData: () => Promise<void>;
  clearModalData: () => Promise<void>;
  clearChanges: () => Promise<void>;
  clearModalChanges: () => Promise<void>;
  clearDelete: () => Promise<void>;
}
