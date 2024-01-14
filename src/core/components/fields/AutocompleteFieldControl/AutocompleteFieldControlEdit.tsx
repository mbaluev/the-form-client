import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, FormControl, FormHelperText } from '@mui/material';
import { classNames } from '@utils/classNames';
import { AutocompleteFieldControlProps, isControlHasData } from '@components/fields';

export const AutocompleteFieldControlEdit = <T,>(props: AutocompleteFieldControlProps<T>) => {
  const { className, value, options, helperText, error, size, ...other } = props;

  const cls = classNames(className, {
    'field-control_no-data': !isControlHasData(value),
  });

  return (
    <FormControl className={cls}>
      <Autocomplete options={options} value={value} popupIcon={<ExpandMoreIcon />} {...other} />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
