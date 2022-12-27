import { Container } from 'inversify';

export const diContainerCreate = (
  infrastructureContainer: Container,
  serviceContainer: Container,
  viewModelContainer: Container
): Container => {
  serviceContainer.parent = infrastructureContainer;
  viewModelContainer.parent = serviceContainer;
  return viewModelContainer;
};
