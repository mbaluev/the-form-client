import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import isEqual from 'lodash/isEqual';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import { useTheme } from '@mui/material';
import { DatePickerFieldProps } from '@components/fields/datePickerField/types';
import { DatePickerField } from 'core/components/fields/datePickerField';
import moment from 'moment';
import { FilterOperator } from '@service/modules/client/api';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';

export const FilterDate = observer((props: DatePickerFieldProps<any>) => {
  const theme = useTheme();
  const { locale } = useLocaleStore();
  const { name = '' } = props;
  const { filters, setFilter } = useFilterStore();
  const [state, setState] = useState<any | null | undefined>(filters[name]);
  const setFilterValue = (value: unknown) => {
    if (value) {
      if (name.toLowerCase().indexOf('from') >= 0)
        setFilter(name, value, FilterOperator.GreaterThanOrEqual);
      if (name.toLowerCase().indexOf('to') >= 0)
        setFilter(name, value, FilterOperator.LessThanOrEqual);
    } else {
      setFilter(name, value, undefined);
    }
  };

  const onChange = (value: any | null) => {
    const m = moment(value).utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const obj1 = m.toISOString();
    const obj2 = filters[name];
    if (!isEqual(obj1, obj2)) setFilterValue(obj1);
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
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  };

  return (
    <DatePickerField
      value={state ? moment(state as string) : null}
      onChange={onChange}
      sx={state ? sxSelected : undefined}
      locale={locale}
      {...props}
    />
  );
});
