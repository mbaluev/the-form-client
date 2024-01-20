import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IBlockItemStore from '@store/modules/entities/block/item/interface';

export const useBlockItemStore = () => {
  const container = useContainer();
  return container.get<IBlockItemStore>(STORE.BlockItem);
};
