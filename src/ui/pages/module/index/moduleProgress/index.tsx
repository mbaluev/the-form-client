import * as React from 'react';
import { classNames } from '@utils/classNames';
import { Progress } from '@components/progress';

interface IModuleProgressProps {
  value?: number;
}

export const ModuleProgress = (props: IModuleProgressProps) => {
  const { value } = props;
  const clsProgress = classNames({
    'background-color_green': value === 100,
  });
  return <Progress value={value} classNameBar={clsProgress} />;
};

export const getProgress = (values?: boolean[]) => {
  let value = 0;
  if (values) {
    const trues = values.filter((v) => v);
    value = (trues.length / values.length) * 100;
  }
  return Math.round(value);
};
