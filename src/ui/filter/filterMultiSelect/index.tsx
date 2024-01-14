import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { SelectChangeEvent } from '@mui/material';
import { useFilters } from '@hooks/useFilters';
import { useRouter } from 'next/router';
import { MultiSelectFieldControl, MultiSelectFieldControlProps } from '@components/fields';
import './index.less';
import _ from 'lodash';

export const FilterMultiSelect = observer((props: MultiSelectFieldControlProps) => {
  const { name = '' } = props;

  const router = useRouter();
  const { filters, setFilter } = useFilters();
  const [state, setState] = useState<string[]>(filters[name]);
  const setFilters = (setFiltersValue: unknown[]) => setFilter(name, setFiltersValue, router);

  const onChange = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string[];
    const obj1 = value ? [...value] : [];
    const obj2 = filters[name] ? [...filters[name]] : [];
    if (!_.isEqual(obj1, obj2)) {
      setFilters(value);
    }
  };

  useEffect(() => setState(filters[name]), [filters[name]]);

  return (
    <MultiSelectFieldControl
      className="filter-multi-select"
      {...props}
      value={state || []}
      onChange={onChange}
    />
  );
});
