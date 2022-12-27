import { IRadioItem } from '@components/fields';

export const RadioItemsFromDictionary = (list: Record<string, string>) => {
  const items: IRadioItem[] = [];
  for (const [key, value] of Object.entries(list)) {
    items.push({ value: key, label: value });
  }
  return items;
};
