import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';

export const Page404 = () => {
  return <ErrorPage code="404" message="Not found" />;
};
