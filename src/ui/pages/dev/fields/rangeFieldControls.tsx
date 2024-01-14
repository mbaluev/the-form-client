import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { RangeFieldControl, SelectFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { useLocale } from '@hooks/useLocale';

export const RangeFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<undefined | number[]>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

  const { fCurrencySymbol } = useLocale();

  return (
    <FormSection title="RangeField" cols={4} id={props.id}>
      <FormField title="1. RangeFieldControl">
        <RangeFieldControl disabled placeholder="disabled" min={0} max={2000} value={[0, 1000]} />
        <RangeFieldControl
          placeholder="simple"
          min={0}
          max={2000}
          value={[100, 1000]}
          format={(num) => fCurrencySymbol(num)}
        />
        <RangeFieldControl
          placeholder="error"
          min={0}
          max={2000}
          value={[100, 1000]}
          error
          helperText="Error message"
        />
      </FormField>
      <FormField title="2. RangeFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <RangeFieldControl
          isEdit={edit}
          placeholder="view"
          min={0}
          max={2000}
          value={value}
          onChange={handleChange}
          format={(num) => fCurrencySymbol(num)}
        />
        <SelectFieldControl />
      </FormField>
      <FormField title="3. RangeFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <RangeFieldControl
          loading={loading}
          placeholder="loading"
          min={0}
          max={2000}
          value={value}
          onChange={handleChange}
        />
      </FormField>
    </FormSection>
  );
};
