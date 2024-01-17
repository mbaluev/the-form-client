import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import type IOptionStore from '@store/modules/common/option/interface';
import type IOptionService from '@service/modules/common/option/interface';

@injectable()
export class OptionStore extends BaseStore implements IOptionStore {
  @inject(SERVICE.Option)
  protected serviceOption!: IOptionService;

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
