import React, { useState, KeyboardEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFilters } from '@hooks/useFilters';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import { useRouter } from 'next/router';

export const FilterText = observer((props: TextFieldControlProps) => {
  const { name = '', ...otherProps } = props;

  const router = useRouter();
  const { filters, setFilter } = useFilters();
  const [state, setState] = useState<string | undefined>(filters[name]);
  const setFilters = (value?: string) => setFilter(name, value, router);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setFilters(state);
    }
  };

  const clearFilters = () => {
    setFilters(undefined);
  };

  useEffect(() => setState(filters[name]), [filters[name]]);

  return (
    <TextFieldControl
      value={state}
      className="filter-text"
      placeholder="Search"
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={clearFilters} edge="end">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...otherProps}
    />
  );
});
