import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import isEqual from 'lodash/isEqual';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import { SelectChangeEvent } from '@mui/material';
import { SelectField } from '@components/fields/selectField';
import { SelectFieldProps } from '@components/fields/selectField/types';

export const FilterSelect = observer((props: SelectFieldProps) => {
  const { name = '' } = props;
  const { filters, setFilter } = useFilterStore();
  const [state, setState] = useState<unknown>(filters[name]);
  const setFilterValue = (value: unknown) => setFilter(name, value);

  const onChange = (e: SelectChangeEvent<unknown>) => {
    const obj1 = e.target.value;
    const obj2 = filters[name];
    if (!isEqual(obj1, obj2)) setFilterValue(obj1);
  };

  useEffect(() => setState(filters[name] || ''), [filters[name]]);

  return <SelectField value={state} onChange={onChange} highlightInput highlightValue {...props} />;
});
