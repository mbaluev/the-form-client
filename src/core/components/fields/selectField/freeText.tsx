import { useTheme, styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { SelectFreeTextFieldProps } from '@components/fields/selectField/types';

const AutocompleteInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& input': {
    borderRadius: theme.shape.borderRadius,
    padding: 7.5,
    paddingLeft: 13,
    paddingRight: 13,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette.t1Grey['80']}`,
    '&:focus': {
      borderWidth: 2,
      padding: 6.5,
      paddingLeft: 12,
      paddingRight: 12,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SelectFreeTextField = (props: SelectFreeTextFieldProps) => {
  const { value, onChange, items, helperText, error, sx } = props;
  const [state, setState] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setState(value as any);
  }, [value]);

  return (
    <FormControl sx={sx}>
      <Autocomplete
        freeSolo
        value={state}
        onChange={(_, newValue) => {
          setState(newValue);
          if (onChange) onChange({ target: { value: newValue } } as SelectChangeEvent<any>, null);
        }}
        isOptionEqualToValue={(option, val) => option === val}
        noOptionsText="not-found"
        renderOption={(optionProps, option, { selected }) => (
          <MenuItem {...optionProps}>
            <ListItemText>{option}</ListItemText>
            {selected && <CheckIcon sx={{ fill: theme.palette.primary.main, ml: 2 }} />}
          </MenuItem>
        )}
        options={items || []}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <AutocompleteInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            placeholder="search"
            onChange={(e) => {
              setState(e.target.value);
              if (onChange) onChange(e as SelectChangeEvent<any>, null);
            }}
            sx={error ? { '& input': { borderColor: theme.palette.error.main } } : undefined}
          />
        )}
      />
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFreeTextField;
