import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';

export const Page403 = () => {
  return <ErrorPage code="403" message="Access denied" />;
};
