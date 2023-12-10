import { injectable } from 'inversify';
import type ILanguageService from '@service/mock/languages/interface';
import type { ILanguageItem } from '@model/common/language';
import { MOCK_LANGUAGES } from '@model/common/language/mock';

@injectable()
export class LanguageService implements ILanguageService {
  getLanguages = async () => {
    return new Promise<ILanguageItem[]>((resolve) => {
      setTimeout(() => resolve(MOCK_LANGUAGES), 100);
    });
  };
}
