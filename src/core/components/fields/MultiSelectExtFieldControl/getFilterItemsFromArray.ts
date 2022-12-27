import { getFilterItemsFromDictionary } from '@components/fields';

export const getFilterItemsFromArray = <ItemType>(
  dictionary: Record<string, string>,
  data: ItemType[] | undefined,
  fieldName: keyof ItemType
) => {
  return getFilterItemsFromDictionary(dictionary).map((filter) => {
    data?.forEach((item) => {
      if (Array.isArray(item[fieldName])) {
        (item[fieldName] as unknown as string[])?.forEach((value) => {
          if (filter.value === value) filter.count++;
        });
      } else {
        if (String(filter.value) === String(item[fieldName])) filter.count++;
      }
    });
    return filter;
  });
};
