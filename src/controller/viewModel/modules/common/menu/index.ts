import { injectable } from 'inversify';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { action, makeObservable, observable } from 'mobx';
import { LStorage } from '@utils/storage/storage';
import { BaseViewModel } from 'controller/viewModel/modules/base/base';

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
    if (LStorage && LStorage.menuState !== undefined) {
      this.setOpen(LStorage.menuState);
    }
    setTimeout(() => this.setInitiated(true));
  };

  // --- override

  setOpen = (value: boolean) => {
    super.setOpen(value);
    LStorage.menuState = value;
  };
}
