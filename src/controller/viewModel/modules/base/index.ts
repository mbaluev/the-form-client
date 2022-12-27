import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { IBaseViewModel } from './interface';

@injectable()
export class BaseViewModel implements IBaseViewModel {
  isLoading = false;

  isEdit = false;

  isOpen = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isEdit: observable,
      isOpen: observable,
      setLoading: action,
      setEdit: action,
      setOpen: action,
    });
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setEdit(value: boolean) {
    this.isEdit = value;
  }

  setOpen(value: boolean) {
    this.isOpen = value;
  }
}
