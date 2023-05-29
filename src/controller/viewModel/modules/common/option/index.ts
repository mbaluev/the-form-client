import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable } from 'mobx';
import { IOptionViewModel } from '@viewModel/modules/common/option/interface';
import { BaseViewModel } from 'controller/viewModel/modules/base/base';
import { OptionService } from '@service/modules/common/option';

@injectable()
export class OptionViewModel extends BaseViewModel implements IOptionViewModel {
  @inject(SERVICE.Option)
  protected serviceOption!: OptionService;

  constructor() {
    super();
    makeObservable(this, {
      getDocumentTypes: action,
    });
  }

  getDocumentTypes = async () => {
    this.setLoading(true);
    try {
      return await this.serviceOption.getDocumentTypes();
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };
}
