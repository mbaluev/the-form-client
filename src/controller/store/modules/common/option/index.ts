import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from '@store/modules/base/store';
import { ISelectItem } from '@components/fields/selectField/types';
import type IOptionStore from '@store/modules/common/option/interface';
import type IOptionService from '@service/modules/common/option/interface';

@injectable()
export class OptionStore extends BaseStore implements IOptionStore {
  @inject(SERVICE.Option)
  protected serviceOption!: IOptionService;

  constructor() {
    super();
    makeObservable(this, {
      documentTypes: observable,
      setDocumentTypes: action,
      getDocumentTypes: action,
    });
  }

  documentTypes?: ISelectItem[] = undefined;

  setDocumentTypes = (value?: ISelectItem[]) => (this.documentTypes = value);

  getDocumentTypes = async () => {
    this.setLoading(true);
    try {
      const data = await this.serviceOption.getDocumentTypes();
      this.setDocumentTypes(data);
      return data;
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
  };
}
