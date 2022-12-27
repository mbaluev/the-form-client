import { IToggleButtonItem } from '@components/fields';

export const getToggleItemsFromDictionary = (
  data?: Record<string, string>
): IToggleButtonItem[] => {
  const items: IToggleButtonItem[] = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      items.push({
        label: data[key],
        value: key,
        disabled: false,
      });
    });
  }
  return items;
};
