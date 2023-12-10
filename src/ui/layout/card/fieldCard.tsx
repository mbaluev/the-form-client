import { FormField, IFormFieldProps } from '@components/form/field';
import { useTheme } from '@mui/material';

export const FieldCard = (props: IFormFieldProps) => {
  const { children, ...other } = props;
  const theme = useTheme();
  return (
    <FormField style={{ gap: theme.spacing(1) }} {...other}>
      {children !== undefined && children !== null ? children : '-'}
    </FormField>
  );
};
