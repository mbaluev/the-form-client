import React, { FC } from 'react';
import { Container } from 'inversify';
import { DIContainerContext } from '@app/diContainer/diContainerContext';

interface IDIContainerProviderProps {
  container: Container;
}

export const DiContainerProvider: FC<IDIContainerProviderProps> = ({ container, children }) => (
  <DIContainerContext.Provider value={container}>{children}</DIContainerContext.Provider>
);
