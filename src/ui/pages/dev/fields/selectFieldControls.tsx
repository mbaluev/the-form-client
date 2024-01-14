import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { SelectFieldControl } from '@components/fields';
import { Button } from '@components/button';

const SelectList = [
  {
    label: 'Administrator',
    value: 1,
  },
  {
    label: 'Manager',
    value: 2,
  },
  {
    label: 'Viewer',
    value: 3,
  },
];

export const SelectFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<unknown>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="SelectField" cols={4} id={props.id}>
      <FormField title="1. SelectFieldControl">
        <SelectFieldControl placeholder="disabled" items={SelectList} disabled />
        <SelectFieldControl placeholder="simple" items={SelectList} />
        <SelectFieldControl
          placeholder="error"
          error={true}
          helperText="Error message"
          items={SelectList}
        />
      </FormField>
      <FormField title="2. SelectFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <SelectFieldControl
          placeholder="select"
          value={value}
          isEdit={edit}
          items={SelectList}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
      <FormField title="3. SelectFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <SelectFieldControl
          placeholder="select"
          value={value}
          loading={loading}
          items={SelectList}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
      <FormField title="4. SelectFieldControl sizes">
        <SelectFieldControl placeholder="default" items={SelectList} size="default" />
        <SelectFieldControl placeholder="medium" items={SelectList} size="medium" />
        <SelectFieldControl placeholder="small" items={SelectList} size="small" />
        <SelectFieldControl placeholder="x-small" items={SelectList} size="x-small" />
      </FormField>
    </FormSection>
  );
};
