import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { AutocompleteFieldControl } from '@components/fields/AutocompleteFieldControl';
import { useLocale } from '@hooks/useLocale';
import countries from '@utils/locale/country';

export const AutocompleteFieldControls = (props: { id?: string }) => {
  const { country } = useLocale();

  const [value, setValue] = useState<string | undefined>(country);
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FormSection title="AutocompleteField" cols={4} id={props.id}>
      <FormField title="1. AutocompleteFieldControl">
        <AutocompleteFieldControl
          placeholder="disabled"
          value={country}
          options={countries.selectItems}
          disableClearable
          disabled
        />
        <AutocompleteFieldControl
          placeholder="simple"
          value={country}
          options={countries.selectItems}
          disableClearable
        />
        <AutocompleteFieldControl
          placeholder="error"
          value={country}
          options={countries.selectItems}
          disableClearable
          error={true}
          helperText="Error message"
        />
      </FormField>
      <FormField title="2. AutocompleteFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <AutocompleteFieldControl
          placeholder="autocomplete"
          value={value}
          options={countries.selectItems}
          onChange={(val) => setValue(val?.value)}
          disableClearable
          isEdit={edit}
        />
      </FormField>
      <FormField title="3. AutocompleteFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <AutocompleteFieldControl
          placeholder="autocomplete"
          value={value}
          options={countries.selectItems}
          onChange={(val) => setValue(val?.value)}
          disableClearable
          loading={loading}
        />
      </FormField>
    </FormSection>
  );
};
