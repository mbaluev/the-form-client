import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { TextInputField } from 'core/components/fields/textInputField';
import { TextInputFieldProps } from '@components/fields/textInputField/types';
import { Warning } from '@ui/layout/fields/warning';
import { useState } from 'react';
import { Copy } from '@components/copy';
import { useTranslation } from 'next-i18next';
import { InputAdornment } from '@mui/material';
import Loader from '@components/loader';

interface IProps extends TextInputFieldProps {
  rules?: RegisterOptions;
  loading?: boolean;
}

export const Input = <T extends FieldValues>(props: IProps) => {
  const { name, rules, loading, ...otherProps } = props;
  const { t } = useTranslation();
  const { control } = useFormContext<T>();
  const [hover, setHover] = useState<boolean>(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={{
        maxLength: {
          value: 256,
          message: `${t('common:validation-max-length')} 256`,
        },
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInputField
          value={value as string}
          onChange={onChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          error={!!error}
          InputProps={{
            endAdornment:
              hover && !otherProps.multiline ? (
                <InputAdornment position="end">
                  <Copy text={value as string} />
                </InputAdornment>
              ) : error ? (
                <InputAdornment position="end">
                  <Warning />
                </InputAdornment>
              ) : loading ? (
                <InputAdornment position="end">
                  <Loader relative loading size={20} />
                </InputAdornment>
              ) : undefined,
          }}
          inputProps={{ autoComplete: 'new-password' }}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
};
