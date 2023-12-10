import { Container } from 'inversify';
import { apiContainer } from '@api/container';
import { serviceContainer } from '@service/container';
import { storeContainer } from '@store/container';

let diContainer: Container | undefined;

const containerCreate = (
  api: Container,
  service: Container,
  store: Container
): Container => {
  service.parent = api;
  store.parent = service;
  return store;
};

export const containerInitialize = (): Container => {
  const container =
    diContainer ??
    containerCreate(apiContainer, serviceContainer, storeContainer);

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return container;

  // Create the store once in the client
  if (!diContainer) diContainer = container;

  return container;
};
