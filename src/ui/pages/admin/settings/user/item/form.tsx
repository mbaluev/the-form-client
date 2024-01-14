import { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { CheckboxField } from '@components/fields/checkboxField';

export const Form = observer(() => {
  const { data, changeField, getError } = useUserItemStore();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.name, e.target.checked);
  };

  return (
    <FormSection>
      <FormField title="Id">
        <TextInputField name="id" disabled value={data?.id} />
      </FormField>
      <FormField title="First name">
        <TextInputField
          name="firstname"
          value={data?.firstname}
          onChange={changeHandler}
          error={Boolean(getError('firstname'))}
          helperText={getError('firstname')?.message}
        />
      </FormField>
      <FormField title="Last name">
        <TextInputField
          name="lastname"
          value={data?.lastname}
          onChange={changeHandler}
          error={Boolean(getError('lastname'))}
          helperText={getError('lastname')?.message}
        />
      </FormField>
      <FormField title="Email">
        <TextInputField
          name="username"
          value={data?.username}
          onChange={changeHandler}
          error={Boolean(getError('username'))}
          helperText={getError('username')?.message}
        />
      </FormField>
      <FormField styleValue={{ overflow: 'visible' }}>
        <CheckboxField
          name="active"
          label="Active"
          value={data?.active}
          onChange={changeCheckboxHandler}
        />
      </FormField>
      <FormField styleValue={{ overflow: 'visible' }}>
        <CheckboxField
          name="paid"
          label="Paid"
          value={data?.paid}
          onChange={changeCheckboxHandler}
        />
      </FormField>
      <FormField styleValue={{ overflow: 'visible' }}>
        <CheckboxField
          name="admin"
          label="Admin"
          value={data?.admin}
          onChange={changeCheckboxHandler}
        />
      </FormField>
    </FormSection>
  );
});
