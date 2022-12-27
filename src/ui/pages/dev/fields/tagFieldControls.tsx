import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { TagFieldControl } from '@components/fields';
import { Button } from '@components/button';

const items = [
  {
    id: '1',
    name: '#Microsoft',
    count: 5,
  },
  {
    id: '2',
    name: '#Adobe',
    count: 10,
  },
  {
    id: '3',
    name: '#JetBrains',
    count: 3,
  },
  {
    id: '4',
    name: '#Oracle',
    count: 6,
  },
  {
    id: '5',
    name: '#Apple',
    count: 1,
  },
];
export const TagFieldControls = (props: { id?: string }) => {
  const [value, setValue] = useState<unknown[] | undefined>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FormSection title="TagField" cols={4} id={props.id}>
      <FormField title="1. TagFieldControl">
        <TagFieldControl
          disabled
          placeholder="disabled"
          items={items}
          valueField="id"
          labelField="name"
          limitTags={2}
          autoPopoverWidth
          multiple
          value={['4', '2']}
        />
        <TagFieldControl
          placeholder="Tags"
          items={items}
          valueField="id"
          labelField="name"
          limitTags={2}
          autoPopoverWidth
          multiple
        />
        <TagFieldControl
          placeholder="error"
          items={items}
          valueField="id"
          labelField="name"
          limitTags={2}
          autoPopoverWidth
          multiple
          error
          helperText="Error message"
        />
      </FormField>
      <FormField title="2. MultiSelectExtFieldControls view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <TagFieldControl
          placeholder="multiple"
          value={value}
          isEdit={edit}
          items={items}
          valueField="id"
          labelField="name"
          limitTags={2}
          onChange={(onChangeValue?: unknown[]) => setValue(onChangeValue)}
          autoPopoverWidth
          multiple
        />
      </FormField>
      <FormField title="3. MultiSelectExtFieldControls loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <TagFieldControl
          placeholder="multiple"
          value={value}
          loading={loading}
          items={items}
          valueField="id"
          labelField="name"
          limitTags={2}
          onChange={(onChangeValue?: unknown[]) => setValue(onChangeValue)}
          autoPopoverWidth
          multiple
        />
      </FormField>
    </FormSection>
  );
};
