import React from 'react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { observer } from 'mobx-react';

interface ISimpleModalFormProps {
  isRow?: boolean;
}

export const SampleForm = observer((props: ISimpleModalFormProps) => {
  const { isRow } = props;
  return (
    <Form className="sample-form">
      <FormSection title="Enter some data" collapsible>
        <FormField isRow={isRow} title="Days" tooltip="tooltip">
          <TextFieldControl
            placeholder="days format"
            inputType="number"
            adornment="days"
          />
        </FormField>
        <FormField isRow={isRow} title="Percent">
          <TextFieldControl
            placeholder="percent format"
            inputType="number"
            adornment="%"
          />
        </FormField>
        <FormField isRow={isRow} title="Currency">
          <TextFieldControl
            placeholder="currency format"
            inputType="currency"
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
