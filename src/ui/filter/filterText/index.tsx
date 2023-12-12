import { useState, KeyboardEvent, useEffect, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { InputAdornment, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import debounce from 'lodash/debounce';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import { TextInputField } from 'core/components/fields/textInputField';
import { TextInputFieldProps } from '@components/fields/textInputField/types';

export const FilterText = observer((props: TextInputFieldProps) => {
  const theme = useTheme();
  const { name = '' } = props;
  const { filters, setFilter } = useFilterStore();
  const [state, setState] = useState<string | undefined>(filters[name]);
  const setFilterValue = (value?: string) => {
    setFilter(name, value);
  };

  const request = debounce((value) => {
    setFilterValue(value);
  }, 400);
  const debounceRequest = useCallback((value: any) => request(value), []);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    debounceRequest(e.target.value);
    if (e.target.value === '') {
      debounceRequest(undefined);
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setFilterValue(state);
    }
  };
  const clearFilters = () => {
    setFilterValue(undefined);
    setState(filters[name]);
  };

  useEffect(() => setState(filters[name]), [filters[name]]);

  const sxSelected = {
    '& .MuiOutlinedInput-notchedOutline, & .MuiDivider-root': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  };

  return (
    <TextInputField
      value={state}
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: state ? (
          <InputAdornment position="end" sx={{ height: '100%', maxHeight: 'none' }}>
            <Divider orientation="vertical" />
            <IconButton onClick={clearFilters} edge="end" color="primary">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={state ? sxSelected : undefined}
      {...props}
    />
  );
});
