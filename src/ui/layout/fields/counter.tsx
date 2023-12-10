import { Counter } from '@components/fields/counterField/counter';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  rules?: any;
}

export const Count = <T extends FieldValues>(props: IProps) => {
  const { name, rules } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as Path<T>}
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
