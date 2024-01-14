import { IToggleButtonItem } from '@components/fields';

export const ToggleButtonItemsFromDictionary = (list: Record<string, string>) => {
  const items: IToggleButtonItem[] = [];
  for (const [key, value] of Object.entries(list)) {
    items.push({ value: key, label: value });
  }
  return items;
};
