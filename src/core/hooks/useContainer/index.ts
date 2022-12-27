import React from 'react';
import { Container } from 'inversify';
import { DIContainerContext } from '@app/diContainer/diContainerContext';

export const useContainer = (): Container => {
  const container = React.useContext(DIContainerContext);
  if (!container) {
    throw Error('Container is not defined');
  }
  return container;
};
