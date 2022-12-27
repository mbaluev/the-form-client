import { initializeDiContainer } from '@app/diContainer/diContainer';

export const useService = <T>(symbol: symbol): T => {
  const container = initializeDiContainer();
  return container.get<T>(symbol);
};
