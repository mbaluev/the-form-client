import { classNames } from '@utils/classNames';
import { Progress } from '@components/progress';
import { observer } from 'mobx-react';

interface IModuleProgressProps {
  value?: number;
  width?: string;
}

export const ModuleProgress = observer((props: IModuleProgressProps) => {
  const { value, width } = props;
  const clsProgress = classNames({
    'background-color_green': value === 100,
  });

  return <Progress value={value} classNameBar={clsProgress} width={width} />;
});

export const getProgress = (values?: boolean[]) => {
  let value = 0;
  if (values && values.length > 0) {
    const trues = values.filter((v) => v);
    value = (trues.length / values.length) * 100;
  }
  return Math.round(value);
};
