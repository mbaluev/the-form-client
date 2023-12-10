import { FormField, IFormFieldProps } from '@components/form/field';
import { useTheme } from '@mui/material';

export const FieldTitle = (props: IFormFieldProps) => {
  const { children, ...other } = props;
  const theme = useTheme();
  return (
    <FormField
      style={{ gap: 2 }}
      styleTitle={{
        fontSize: '1rem',
        fontWeight: 'normal',
        color: theme.palette.t1Grey['150'],
      }}
      styleValue={{ fontSize: '1rem' }}
      {...other}
    >
      {children}
    </FormField>
  );
};
