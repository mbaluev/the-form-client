import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { DateFieldControl } from '@components/fields';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ILocaleViewModel } from '@viewModel/modules/common/locale/interface';
import { observer } from 'mobx-react';

export const DateFieldControls = observer((props: { id?: string }) => {
  const [value, setValue] = useState<Date | null | undefined>(new Date());
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { fDateFormat } = useViewModel<ILocaleViewModel>(VIEW_MODEL.Locale);
  return (
    <FormSection title="DateField" cols={4} id={props.id}>
      <FormField title="1. DateFieldControl">
        <DateFieldControl disabled inputFormat={fDateFormat} />
        <DateFieldControl inputFormat={fDateFormat} />
        <DateFieldControl
          helperText="Error message"
          error={true}
          inputFormat={fDateFormat}
        />
        <DateFieldControl views={['year', 'month']} />
      </FormField>
      <FormField title="2. DateFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <DateFieldControl
          value={value}
          isEdit={edit}
          onChange={(date) => setValue(date)}
          inputFormat={fDateFormat}
        />
      </FormField>
      <FormField title="3. DateFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <DateFieldControl
          value={value}
          loading={loading}
          onChange={(date) => setValue(date)}
          inputFormat={fDateFormat}
        />
      </FormField>
    </FormSection>
  );
});
