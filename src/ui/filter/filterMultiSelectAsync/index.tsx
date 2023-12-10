import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import { useTheme } from '@mui/material';
import { MultiSelectAsyncFieldProps } from '@components/fields/multiSelectField/types';
import { MultiSelectAsyncField } from '@components/fields/multiSelectField/async';

export const FilterMultiSelectAsync = observer(
  <ItemType,>(props: MultiSelectAsyncFieldProps<ItemType>) => {
    const { name = '' } = props;
    const { filters, setFilter } = useFilterStore();
    const [state, setState] = useState<any[]>([]);
    const setFilterValue = (value?: any[]) => setFilter(name, value);
    const theme = useTheme();

    const onChange = (val?: unknown[]) => {
      const obj1 = val?.filter((d) => d);
      const obj2 = filters[name];
      if (!isEqual(obj1, obj2)) setFilterValue(obj1);
    };

    useEffect(() => {
      let value = filters[name];
      if (!Array.isArray(value) && value !== undefined) value = [value];
      setState(value);
    }, [filters[name]]);

    const sxSelected = {
      '& .MuiOutlinedInput-notchedOutline, & .MuiDivider-root': {
        borderColor: theme.palette.primary.main,
      },
    };

    return (
      <MultiSelectAsyncField
        value={state}
        onChange={onChange}
        multiple
        sx={state && state.length > 0 ? sxSelected : undefined}
        {...props}
      />
    );
  }
);
