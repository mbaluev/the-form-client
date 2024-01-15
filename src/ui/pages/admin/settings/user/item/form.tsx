import { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { CheckboxField } from '@components/fields/checkboxField';
import { useRouter } from 'next/router';
import { PasswordField } from '@components/fields/passwordField';

export const Form = observer(() => {
  const { data, changeField, getError, hasErrors } = useUserItemStore();
  const router = useRouter();
  const id = router.query.id;
  const isCreate = id === 'create';

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.name, e.target.checked);
  };
  useEffect(() => {}, [hasErrors]);

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
      {isCreate && (
        <FormField title="Password">
          <PasswordField
            name="password"
            value={data?.password}
            onChange={changeHandler}
            error={Boolean(getError('password'))}
            helperText={getError('password')?.message}
          />
        </FormField>
      )}
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
