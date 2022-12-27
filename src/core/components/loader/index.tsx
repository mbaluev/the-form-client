import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface ILoaderProps {
  loading?: boolean;
  backdrop?: boolean;
  size?: number;
  relative?: boolean;
  color?: 'white';
}

export const Loader = (props: ILoaderProps) => {
  const { loading, backdrop, size, relative, color } = props;
  const cls = classNames('loader', {
    loader_relative: Boolean(relative),
    [`loader_color_${color}`]: Boolean(color),
  });
  return loading ? (
    <div className={cls}>
      {backdrop && <div className="loader-backdrop" />}
      <CircularProgress size={size} />
    </div>
  ) : null;
};
