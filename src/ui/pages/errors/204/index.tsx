import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

interface IProps {
  message?: string;
}

export const Page204 = (props: IProps) => {
  const { message = 'No content. Please select item' } = props;
  return (
    <ErrorPage
      className="color_grey-120"
      icon={<DoNotDisturbIcon className="color_grey-50" />}
      description={message}
    />
  );
};
