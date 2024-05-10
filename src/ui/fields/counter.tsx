import { Controller, useFormContext } from 'react-hook-form';
import { Counter, ICounterProps } from '@components/fields/counterField/counter';

interface IProps extends ICounterProps {
  name: string;
  rules?: any;
}

export const Count = (props: IProps) => {
  const { name, rules, ...counterProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const handleChange = (val: number) => {
          if (!(!Boolean(value) && !Boolean(val)) && !Number.isNaN(val) && val !== value) {
            onChange({ target: { value: val } });
          }
        };
        return (
          <Counter min={0} count={Number(value || 0)} onChange={handleChange} {...counterProps} />
        );
      }}
    />
  );
};
