import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import DoneIcon from '@mui/icons-material/Done';

export const Page402 = () => {
  return (
    <ErrorPage
      className="color_green-dark"
      icon={<DoneIcon className="color_green-dark" />}
      description="Sign up success. Wait for confirmation"
    />
  );
};
