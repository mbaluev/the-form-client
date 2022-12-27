import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { SliderFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { useLocale } from '@hooks/useLocale';

export const SliderFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<number>(200);
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const { fCurrencySymbol } = useLocale();

  return (
    <FormSection title="SliderField" cols={4} id={props.id}>
      <FormField title="1. SliderFieldControl">
        <SliderFieldControl
          placeholder="disabled"
          disabled
          min={0}
          max={2000}
          value={300}
        />
        <SliderFieldControl
          placeholder="range"
          min={0}
          max={2000}
          value={[500, 1500]}
          format={(num) => fCurrencySymbol(num)}
        />
        <SliderFieldControl
          placeholder="error"
          min={0}
          max={2000}
          value={800}
          error
          helperText="Error message"
        />
      </FormField>
      <FormField title="2. SliderFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <SliderFieldControl
          placeholder="view"
          isEdit={edit}
          min={0}
          max={2000}
          value={value}
          onChange={handleChange}
          format={(num) => fCurrencySymbol(num)}
        />
      </FormField>
      <FormField title="3. SliderFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <SliderFieldControl
          placeholder="loading"
          loading={loading}
          min={0}
          max={2000}
          value={value}
          onChange={handleChange}
          format={(num) => fCurrencySymbol(num)}
        />
      </FormField>
    </FormSection>
  );
};
