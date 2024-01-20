import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IBlockListStore from '@store/modules/entities/block/list/interface';

export const useBlockListStore = () => {
  const container = useContainer();
  return container.get<IBlockListStore>(STORE.BlockList);
};
