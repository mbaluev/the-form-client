import React, { useState } from 'react';
import { declinationOfNumber } from '@utils/number/declinationOfNumber';
import { FormField, FormSection } from '@components/form';
import { MultiSelectExtFieldControl } from '@components/fields';
import { Button } from '@components/button';

const ITEM_FORMS = ['item', 'items'];

interface ItemType {
  id: string;
  name: string;
  count: number;
}
const items: ItemType[] = [
  {
    id: '1',
    name: 'Microsoft',
    count: 5,
  },
  {
    id: '2',
    name: 'Adobe',
    count: 10,
  },
  {
    id: '3',
    name: 'JetBrains',
    count: 3,
  },
  {
    id: '4',
    name: 'Oracle',
    count: 6,
  },
  {
    id: '5',
    name: 'Apple',
    count: 1,
  },
];

export const MultiSelectExtFieldControls = (props: { id?: string }) => {
  const renderOption = (item: ItemType) => {
    return item.name;
  };
  const renderValue = (selItems: ItemType[]) => {
    return `${selItems.length} ${declinationOfNumber(
      selItems.length,
      ITEM_FORMS
    )} (${selItems.map((item) => item.name).join(', ')})`;
  };

  const [value, setValue] = useState<unknown[] | undefined>();
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FormSection title="MultiSelectExtField" cols={4} id={props.id}>
      <FormField title="1. MultiSelectExtFieldControls">
        <MultiSelectExtFieldControl
          placeholder="diabled"
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
          disabled
        />
        <MultiSelectExtFieldControl
          placeholder="simple"
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
        />
        <MultiSelectExtFieldControl
          placeholder="multiple"
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
          multiple
        />
        <MultiSelectExtFieldControl
          placeholder="error"
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
          error={true}
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
        <MultiSelectExtFieldControl
          placeholder="multiple"
          value={value}
          isEdit={edit}
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
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
        <MultiSelectExtFieldControl
          placeholder="multiple"
          value={value}
          loading={loading}
          items={items}
          valueField="id"
          labelField="name"
          renderOption={renderOption}
          renderValue={renderValue}
          onChange={(onChangeValue?: unknown[]) => setValue(onChangeValue)}
          autoPopoverWidth
          multiple
        />
      </FormField>
    </FormSection>
  );
};
