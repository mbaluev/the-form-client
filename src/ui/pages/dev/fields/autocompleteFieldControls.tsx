import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { AutocompleteFieldControl } from '@components/fields/AutocompleteFieldControl';
import { useLocale } from '@hooks/useLocale';
import { TextFieldControl } from '@components/fields';
import countries from '@utils/locale/country';
import { AsyncAutocompleteFieldControl } from '@components/fields/AsyncAutocompleteFieldControl';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IOptionViewModel } from '@viewModel/modules/common/option/interface';

export const AutocompleteFieldControls = observer((props: { id?: string }) => {
  const { country } = useLocale();
  const optionModel = useViewModel<IOptionViewModel>(VIEW_MODEL.Option);
  const { getDocumentTypes, isLoading } = optionModel;

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
          renderInput={(params) => <TextFieldControl {...params} />}
          disableClearable
          disabled
        />
        <AutocompleteFieldControl
          placeholder="simple"
          value={country}
          options={countries.selectItems}
          renderInput={(params) => <TextFieldControl {...params} />}
          disableClearable
        />
        <AutocompleteFieldControl
          placeholder="error"
          value={country}
          options={countries.selectItems}
          renderInput={(params) => <TextFieldControl {...params} />}
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
          renderInput={(params) => <TextFieldControl {...params} />}
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
          renderInput={(params) => <TextFieldControl {...params} />}
          disableClearable
          loading={loading}
        />
      </FormField>
      <FormField title="4. AutocompleteFieldControl async">
        <AsyncAutocompleteFieldControl
          placeholder="simple"
          disableClearable
          loading={isLoading}
          promise={getDocumentTypes}
        />
      </FormField>
    </FormSection>
  );
});
