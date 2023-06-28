import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export const Page204 = () => {
  return (
    <ErrorPage
      className="color_grey-120"
      icon={<DoNotDisturbIcon className="color_grey-50" />}
      message="No content. Please select item"
    />
  );
};
