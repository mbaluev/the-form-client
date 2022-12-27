import React from 'react';
import { Container } from 'inversify';

export const DIContainerContext = React.createContext<Container | null>(null);
