import React from 'react';
import { LinearProgress } from '@mui/material';
import './index.scss';

interface IProgressProps {
  value?: number;
  classNameBar?: string;
}

export const Progress = (props: IProgressProps) => {
  const { value = 0, classNameBar } = props;
  return (
    <div className="progress">
      <LinearProgress
        value={value}
        classes={{ bar: classNameBar }}
        variant="determinate"
      />
      <div className="progress__label">{value}</div>
    </div>
  );
};
