import { Container } from 'inversify';
import { createContext, ReactNode } from 'react';

interface IProps {
  container: Container;
  children?: ReactNode;
}

export const ContainerContext = createContext<Container | null>(null);

export const ContainerProvider = ({ container, children }: IProps) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};
