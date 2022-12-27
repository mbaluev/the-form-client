import { injectable } from 'inversify';
import { IMenuViewModel } from '@viewModel/modules/menu/interface';
import { action, makeObservable, observable } from 'mobx';
import { SStorage } from '@utils/storage/storage';
import { BaseViewModel } from '@viewModel/modules/base';

@injectable()
export class MenuViewModel extends BaseViewModel implements IMenuViewModel {
  constructor() {
    super();
    makeObservable(this, {
      initiated: observable,
      setInitiated: action,
      initiate: action,
    });
  }

  initiated = false;

  setInitiated = (value: boolean) => {
    this.initiated = value;
  };

  initiate = () => {
    if (SStorage && SStorage.menuState !== undefined) {
      this.setOpen(SStorage.menuState);
    }
    setTimeout(() => this.setInitiated(true));
  };

  // --- override

  setOpen = (value: boolean) => {
    super.setOpen(value);
    SStorage.menuState = value;
  };
}
