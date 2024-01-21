import { Controller, useFormContext } from 'react-hook-form';
import { Counter } from '@components/fields/counterField/counter';

interface IProps {
  name: string;
  rules?: any;
}

export const Count = (props: IProps) => {
  const { name, rules } = props;
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
        return <Counter min={0} count={Number(value)} onChange={handleChange} />;
      }}
    />
  );
};
