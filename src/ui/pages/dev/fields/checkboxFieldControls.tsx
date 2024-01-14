import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { CheckboxFieldControl } from '@components/fields';

export const CheckboxFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="CheckboxField" cols={4} id={props.id}>
      <FormField title="1. CheckboxFieldControl">
        <CheckboxFieldControl label="disabled" disabled />
        <CheckboxFieldControl label="disabled checked" value={true} disabled />
        <CheckboxFieldControl label="simple" />
        <CheckboxFieldControl label="error" error={true} helperText="Error message" />
      </FormField>
      <FormField title="2. CheckboxFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <CheckboxFieldControl
          label="select"
          value={value}
          isEdit={edit}
          onChange={(e) => setValue(e.target.checked)}
        />
      </FormField>
      <FormField title="3. CheckboxFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <CheckboxFieldControl
          label="select"
          value={value}
          loading={loading}
          onChange={(e) => setValue(e.target.checked)}
        />
      </FormField>
    </FormSection>
  );
};
