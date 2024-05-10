import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IBlockSchoolItemStore from '@store/modules/school/block/item/interface';

export const useBlockSchoolItemStore = () => {
  const container = useContainer();
  return container.get<IBlockSchoolItemStore>(STORE.BlockSchoolItem);
};
