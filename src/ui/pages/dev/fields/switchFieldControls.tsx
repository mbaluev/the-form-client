import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { SwitchFieldControl } from '@components/fields';

export const SwitchFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="SwitchField" cols={4} id={props.id}>
      <FormField title="1. SwitchFieldControl">
        <SwitchFieldControl label="disabled" disabled />
        <SwitchFieldControl label="disabled checked" value={true} disabled />
        <SwitchFieldControl label="simple" />
        <SwitchFieldControl label="error" error={true} helperText="Error message" />
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
        <SwitchFieldControl
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
        <SwitchFieldControl
          label="select"
          value={value}
          loading={loading}
          onChange={(e) => setValue(e.target.checked)}
        />
      </FormField>
    </FormSection>
  );
};
