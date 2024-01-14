import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { SelectChangeEvent } from '@mui/material';
import { useFilters } from '@hooks/useFilters';
import { useRouter } from 'next/router';
import { SelectFieldControl, SelectFieldControlProps } from '@components/fields';
import _ from 'lodash';

export const FilterSelect = observer((props: SelectFieldControlProps) => {
  const { name = '' } = props;

  const router = useRouter();
  const { filters, setFilter } = useFilters();
  const [state, setState] = useState<unknown>(filters[name]);
  const setFilters = (setFiltersValue: unknown) => setFilter(name, setFiltersValue, router);

  const onChange = (e: SelectChangeEvent<unknown>) => {
    const obj1 = e.target.value;
    const obj2 = filters[name];
    if (!_.isEqual(obj1, obj2)) {
      setFilters(obj1);
    }
  };

  useEffect(() => setState(filters[name] || ''), [filters[name]]);

  return (
    <SelectFieldControl className="filter-select" {...props} value={state} onChange={onChange} />
  );
});
