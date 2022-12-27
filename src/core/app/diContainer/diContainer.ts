import { diContainerCreate } from '@app/diContainer/diContainerCreate';
import { infrastructureContainer } from '@infrastructure/container';
import { serviceContainer } from '@service/container';
import { viewModelContainer } from '@viewModel/container';
import { Container } from 'inversify';

let diContainer: Container | undefined;

export const initializeDiContainer = (): Container => {
  const container = diContainerCreate(
    infrastructureContainer,
    serviceContainer,
    viewModelContainer
  );

  // For server side rendering always create a new container
  if (typeof window === 'undefined') return container;

  // Create container once in the client
  if (!diContainer) diContainer = container;

  return diContainer;
};
