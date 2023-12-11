import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import type IBaseStore from '@store/modules/base/store/interface';

@injectable()
export class BaseStore implements IBaseStore {
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isEdit: observable,
      isOpen: observable,
      error: observable,
      setLoading: action,
      setEdit: action,
      setOpen: action,
      setError: action,
    });
  }

  isLoading = false;

  isEdit = false;

  isOpen = false;

  error?: string = undefined;

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setEdit = (isEdit: boolean) => {
    this.isEdit = isEdit;
  };

  setOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
  };

  setError = (value?: string) => {
    this.error = value;
  };
}
