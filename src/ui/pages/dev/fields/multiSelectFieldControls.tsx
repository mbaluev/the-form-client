import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { MultiSelectFieldControl } from '@components/fields';
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

export const MultiSelectFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<unknown[]>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="MultiSelectField" cols={4} id={props.id}>
      <FormField title="1. MultiSelectFieldControl">
        <MultiSelectFieldControl placeholder="disabled" items={SelectList} disabled />
        <MultiSelectFieldControl placeholder="simple" items={SelectList} />
        <MultiSelectFieldControl
          placeholder="error"
          error={true}
          helperText="Error message"
          items={SelectList}
        />
      </FormField>
      <FormField title="2. MultiSelectFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <MultiSelectFieldControl
          placeholder="multiselect"
          value={value}
          isEdit={edit}
          items={SelectList}
          onChange={(e) => setValue(e.target.value as unknown[])}
        />
      </FormField>
      <FormField title="3. MultiSelectFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <MultiSelectFieldControl
          placeholder="multiselect"
          value={value}
          loading={loading}
          items={SelectList}
          onChange={(e) => setValue(e.target.value as unknown[])}
        />
      </FormField>
    </FormSection>
  );
};
