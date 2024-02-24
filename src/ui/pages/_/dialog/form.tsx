import { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useUserSettingsItemStore } from '@store/modules/settings/user/settings/item/hook';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { CheckboxField } from '@components/fields/checkboxField';
import { Grid } from '@mui/material';
import { PasswordField } from '@components/fields/passwordField';

export const Form = observer(() => {
  const { modalData, changeModalField, getModalError, hasModalErrors } = useUserSettingsItemStore();
  const spacing = 3;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeModalField(e.target.name, e.target.checked);
  };

  useEffect(() => {}, [hasModalErrors]);

  return (
    <Grid container spacing={spacing} alignItems="flex-start">
      <Grid item xs={12} sm={6}>
        <FormField title="Id">
          <TextInputField name="id" disabled value={modalData?.id} />
        </FormField>
      </Grid>
      <Grid item xs={12} container spacing={spacing}>
        <Grid item xs={12} sm={6}>
          <FormField title="First name">
            <TextInputField
              name="firstname"
              value={modalData?.firstname as any}
              onChange={changeHandler}
              error={Boolean(getModalError('firstname'))}
              helperText={getModalError('firstname')?.message}
            />
          </FormField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField title="Last name">
            <TextInputField
              name="lastname"
              value={modalData?.lastname as any}
              onChange={changeHandler}
              error={Boolean(getModalError('lastname'))}
              helperText={getModalError('lastname')?.message}
            />
          </FormField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField title="Email">
            <TextInputField
              name="username"
              value={modalData?.username as any}
              onChange={changeHandler}
              error={Boolean(getModalError('username'))}
              helperText={getModalError('username')?.message}
            />
          </FormField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField title="Password">
            <PasswordField
              name="password"
              value={modalData?.password as any}
              onChange={changeHandler}
              error={Boolean(getModalError('password'))}
              helperText={getModalError('password')?.message}
            />
          </FormField>
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={spacing}>
        <Grid item xs={12}>
          <FormField styleValue={{ overflow: 'visible' }}>
            <CheckboxField
              name="active"
              label="Active"
              value={modalData?.active as any}
              onChange={changeCheckboxHandler}
            />
          </FormField>
        </Grid>
        <Grid item xs={12}>
          <FormField styleValue={{ overflow: 'visible' }}>
            <CheckboxField
              name="paid"
              label="Paid"
              value={modalData?.paid as any}
              onChange={changeCheckboxHandler}
            />
          </FormField>
        </Grid>
        <Grid item xs={12}>
          <FormField styleValue={{ overflow: 'visible' }}>
            <CheckboxField
              name="admin"
              label="Admin"
              value={modalData?.admin as any}
              onChange={changeCheckboxHandler}
            />
          </FormField>
        </Grid>
      </Grid>
    </Grid>
  );
});
