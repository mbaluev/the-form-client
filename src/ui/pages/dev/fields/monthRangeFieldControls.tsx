import React from 'react';
import { FormField, FormSection } from '@components/form';
import { observer } from 'mobx-react';
import { MonthRangeFieldControl, YearMonthRange } from '@components/fields/MonthRangeFieldControl';
import { TODAY } from '@utils/date/today';

export const MonthRangeFieldControls = observer((props: { id?: string }) => {
  const today = new Date();
  const [value, setValue] = React.useState<YearMonthRange>([today, today]);
  return (
    <FormSection title="MonthRange" cols={4} id={props.id}>
      <FormField title="1. MonthRangeFieldControl" align="left">
        <MonthRangeFieldControl
          onChange={setValue}
          value={value}
          minDate={new Date(TODAY.year - 1, 0)}
          maxDate={new Date(TODAY.year, 0)}
          confirmText="OK"
          curYearText="Current Year"
        />
        <MonthRangeFieldControl
          buttonProps={{
            size: 'small',
            variant: 'text',
          }}
          onChange={setValue}
          value={value}
          minDate={new Date(TODAY.year - 1, 0)}
          maxDate={new Date(TODAY.year, 0)}
          confirmText="OK"
          curYearText="Current Year"
        />
        <MonthRangeFieldControl
          type="input"
          onChange={setValue}
          value={value}
          minDate={new Date(TODAY.year - 1, 0)}
          maxDate={new Date(TODAY.year, 0)}
          confirmText="OK"
          curYearText="Current Year"
        />
      </FormField>
    </FormSection>
  );
});
