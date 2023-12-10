import { FormField, IFormFieldProps } from '@components/form/field';

export const FieldName = (props: IFormFieldProps) => {
  const { children, ...other } = props;
  return (
    <FormField
      style={{ gap: 2 }}
      styleTitle={{ fontSize: '1rem' }}
      styleValue={{ fontSize: '1rem' }}
      {...other}
    >
      {children}
    </FormField>
  );
};
