import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Loader } from '@components/loader';

interface IProps {
  loading?: boolean;
}
export const Page204 = (props: IProps) => {
  const { loading } = props;

  if (loading) {
    return (
      <ErrorPage
        className="color_grey-120"
        icon={<Loader loading relative />}
        message="Loading..."
      />
    );
  }

  return (
    <ErrorPage
      className="color_grey-120"
      icon={<DoNotDisturbIcon className="color_grey-50" />}
      message="No content. Please select item"
    />
  );
};
