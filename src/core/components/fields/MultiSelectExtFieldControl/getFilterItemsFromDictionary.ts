export const getFilterItemsFromDictionary = (
  data?: Record<string, string>
): any[] => {
  const items: any[] = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      items.push({
        label: data[key],
        value: key,
        count: 0,
      });
    });
  }
  return items;
};
