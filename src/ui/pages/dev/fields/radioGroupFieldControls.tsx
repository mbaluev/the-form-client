import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { RadioGroupFieldControl } from '@components/fields';

const items = [
  { value: '1', label: 'option 1' },
  { value: '2', label: 'option 2' },
];

export const RadioGroupFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<string>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="RadioGroupField" cols={4} id={props.id}>
      <FormField title="1. RadioGroupFieldControl">
        <RadioGroupFieldControl disabled items={items} value="1" />
        <RadioGroupFieldControl items={items} value="1" layout="horizontal" />
        <RadioGroupFieldControl
          error={true}
          helperText="Error message"
          items={items}
          value="1"
        />
      </FormField>
      <FormField title="2. RadioGroupFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <RadioGroupFieldControl
          value={value}
          items={items}
          isEdit={edit}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
      <FormField title="3. RadioGroupFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <RadioGroupFieldControl
          value={value}
          items={items}
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    </FormSection>
  );
};
