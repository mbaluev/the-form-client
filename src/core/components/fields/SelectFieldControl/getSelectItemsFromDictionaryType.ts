import { ISelectItem } from '@components/fields';
import { IDictionaryTypeDTO } from '@model/dictionary';

export const getSelectItemsFromDictionaryType = <T>(
  dictionary: IDictionaryTypeDTO<T>,
  field: keyof T
): ISelectItem[] => {
  const items: ISelectItem[] = [];
  if (dictionary) {
    Object.keys(dictionary).forEach((key) => {
      const label = dictionary[key][field] as any;
      items.push({
        label,
        value: key,
        disabled: false,
      });
    });
  }
  return items;
};
