import { useContext } from 'react';
import { Container } from 'inversify';
import { ContainerContext } from '@provider/context';

export const useContainer = (): Container => {
  const container = useContext(ContainerContext);
  if (!container) {
    throw Error('Container is not defined');
  }
  return container;
};
