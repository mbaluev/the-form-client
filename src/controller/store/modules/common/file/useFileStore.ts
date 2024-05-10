import { useContainer } from '@provider/useContainer';
import { STORE } from '@store/ids';
import type IFileStore from '@store/modules/common/file/interface';

export const useFileStore = () => {
  const container = useContainer();
  return container.get<IFileStore>(STORE.File);
};
