import { ISelectItem } from '@components/fields';
import { IDictionaryDTO } from '@model/dictionary';

export const getSelectItemsFromDictionary = (
  dictionary?: IDictionaryDTO
): ISelectItem[] => {
  const items: ISelectItem[] = [];
  if (dictionary) {
    Object.keys(dictionary).forEach((key) => {
      const label = dictionary[key];
      items.push({
        label,
        value: key,
        disabled: false,
      });
    });
  }
  return items;
};
