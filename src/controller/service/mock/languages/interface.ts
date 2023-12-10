import type { ILanguageItem } from '@model/common/language';

export default interface ILanguageService {
  getLanguages: () => Promise<ILanguageItem[]>;
}
