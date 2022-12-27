import { getToggleItemsFromDictionary } from '@components/fields';

export const getToggleItemsFromObject = <ItemType>(
  dictionary: Record<string, string>,
  data: ItemType | undefined,
  fieldName: keyof ItemType
) => {
  return getToggleItemsFromDictionary(dictionary).filter((item) => {
    if (data) {
      if (Array.isArray(data[fieldName])) {
        return (data[fieldName] as unknown as string[]).reduce(
          (prev: boolean, curr: string) => {
            return prev || item.value === curr;
          },
          false
        );
      } else {
        return String(item.value) === String(data[fieldName]);
      }
    }
    return false;
  });
};
