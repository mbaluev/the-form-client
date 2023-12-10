import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import type IClientService from '@service/modules/client/interface';
import type ILanguageStore from '@store/modules/common/language/interface';
import type ILanguageService from '@service/mock/languages/interface';
import type { ILanguageItem } from '@model/common/language';
import { BaseStore } from '@store/modules/base/store';

@injectable()
export class LanguageStore extends BaseStore implements ILanguageStore {
  @inject(SERVICE.Client) protected clientService!: IClientService;

  @inject(SERVICE.Language) protected languageService!: ILanguageService;

  constructor() {
    super();
    makeObservable(this, {
      languages: observable,
      setLanguages: observable,
      init: action,
    });
  }

  languages?: ILanguageItem[] = undefined;

  setLanguages = (value?: ILanguageItem[]) => {
    this.languages = value;
  };

  init = async () => {
    this.setLoading(true);
    try {
      const data = await this.languageService.getLanguages();
      this.setLanguages(data);
    } catch (err) {
    } finally {
      this.setLoading(false);
    }
    // }
  };
}
