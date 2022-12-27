import React, { ChangeEvent } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Form, FormField, FormSection } from '@components/form';
import { CheckboxFieldControl, TextFieldControl } from '@components/fields';
import { IUserViewModel } from '@viewModel/modules/user/interface';

export const TabDetails = observer(() => {
  const { data, changeField, getError } = useViewModel<IUserViewModel>(
    VIEW_MODEL.User
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.name, e.target.checked);
  };

  return (
    <Form cols={1}>
      <FormSection>
        <FormField isRow title="Id">
          <TextFieldControl name="id" disabled value={data?.id} />
        </FormField>
        <FormField isRow title="Email">
          <TextFieldControl
            name="username"
            value={data?.username}
            onChange={changeHandler}
            error={Boolean(getError('username'))}
            helperText={getError('username')?.message}
          />
        </FormField>
        <FormField isRow title="&nbsp;">
          <CheckboxFieldControl
            name="active"
            label="Active"
            value={data?.active}
            onChange={changeCheckboxHandler}
          />
        </FormField>
        <FormField isRow title="&nbsp;">
          <CheckboxFieldControl
            name="paid"
            label="Paid"
            value={data?.paid}
            onChange={changeCheckboxHandler}
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
