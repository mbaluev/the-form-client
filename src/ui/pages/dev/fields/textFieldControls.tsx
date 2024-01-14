import React, { useState } from 'react';
import { FormField, FormSection } from '@components/form';
import { Button } from '@components/button';
import { TextFieldControl } from '@components/fields';
import { observer } from 'mobx-react';
import { useLocale } from '@hooks/useLocale';

export const TextFieldControls = observer((props: { id?: string }) => {
  const [value, setValue] = useState<string>('1500250.4');
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale();
  return (
    <FormSection title="TextField" cols={4} id={props.id}>
      <FormField title="1. TextFieldControl">
        <TextFieldControl disabled placeholder="disabled" value={value} />
        <TextFieldControl placeholder="simple" value={value} />
        <TextFieldControl placeholder="multiline" multiline minRows={5} value={value} />
        <TextFieldControl
          placeholder="error"
          helperText="Error message"
          error={true}
          value={value}
        />
      </FormField>
      <FormField title="2. TextFieldControl view">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'view' : 'edit'}
        </Button>
        <TextFieldControl
          placeholder="days format"
          value={value}
          isEdit={edit}
          onChange={(e) => setValue(e.target.value)}
          inputType="number"
          adornment="days"
        />
        <TextFieldControl
          placeholder="percent format"
          value={value}
          isEdit={edit}
          onChange={(e) => setValue(e.target.value)}
          inputType="number"
          adornment="%"
        />
        <TextFieldControl
          placeholder="currency format"
          value={value}
          isEdit={edit}
          onChange={(e) => setValue(e.target.value)}
          inputType="currency"
        />
        <TextFieldControl
          placeholder="currency format"
          value={value}
          isEdit={edit}
          onChange={(e) => setValue(e.target.value)}
          inputType="currency"
          adornment={locale.currencyInfo?.symbol}
        />
      </FormField>
      <FormField title="3. TextFieldControl loading">
        <Button
          variant="contained"
          color="blue"
          className="field-control"
          onClick={() => setLoading(!loading)}
        >
          {loading ? 'edit' : 'loading'}
        </Button>
        <TextFieldControl
          placeholder="days format"
          value={value}
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
          inputType="number"
          adornment="days"
        />
        <TextFieldControl
          placeholder="percent format"
          value={value}
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
          inputType="number"
          adornment="%"
        />
        <TextFieldControl
          placeholder="currency format"
          value={value}
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
          inputType="currency"
        />
      </FormField>
      <FormField title="4. TextFieldControl sizes">
        <TextFieldControl placeholder="default" />
        <TextFieldControl placeholder="medium" size="medium" />
        <TextFieldControl placeholder="small" size="small" />
        <TextFieldControl placeholder="x-small" size="x-small" />
      </FormField>
    </FormSection>
  );
});
