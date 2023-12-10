import { ISelectItem } from '@components/fields/selectField/types';

export const findItem = (items?: ISelectItem[], value?: any) => {
  return items?.find((item) => {
    return String(item.value) === String(value);
  });
};
