import React from 'react';
import { LinearProgress } from '@mui/material';
import './index.scss';

interface IProgressProps {
  value?: number;
  classNameBar?: string;
  width?: string;
}

export const Progress = (props: IProgressProps) => {
  const { value = 0, classNameBar, width } = props;
  return (
    <div className="progress" style={{ width }}>
      <LinearProgress value={value} classes={{ bar: classNameBar }} variant="determinate" />
      <div className="progress__label">{value}</div>
    </div>
  );
};
