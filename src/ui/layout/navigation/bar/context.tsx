import { createContext, ReactElement, ReactNode, useContext } from 'react';

interface IProps {
  bar: ReactElement | null;
  children: ReactNode | null;
}

export const BarContext = createContext<ReactElement | null>(null);

export const BarProvider = ({ bar, children }: IProps) => (
  <BarContext.Provider value={bar}>{children}</BarContext.Provider>
);

export const useBar = (): ReactElement | null => {
  return useContext(BarContext);
};
