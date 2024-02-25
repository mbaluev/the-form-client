import { useRouter } from 'next/router';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { Input } from '@ui/fields/input';
import { Password } from '@ui/fields/password';
import { Checkbox } from '@ui/fields/checkbox';
import { observer } from 'mobx-react';
import { useUserSettingsItemStore } from '@store/modules/settings/user/item/hook';
import { ROUTES } from '@settings/routes';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useUserSettingsItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_USER_CREATE.path;
  const required = { required: 'required' };

  return (
    <FormSection>
      <FormField title="Id">
        <Input name="id" placeholder="id" disabled />
      </FormField>
      <FormField title="First name">
        <Input name="firstname" placeholder="first name" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Last name">
        <Input name="lastname" placeholder="last name" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Email">
        <Input name="username" placeholder="email" rules={required} disabled={disabled} />
      </FormField>
      {isCreate && (
        <FormField title="Password">
          <Password name="password" placeholder="password" rules={required} disabled={disabled} />
        </FormField>
      )}
      <FormField styleValue={{ overflow: 'visible' }}>
        <Checkbox name="active" label="Active" disabled={disabled} />
      </FormField>
      <FormField styleValue={{ overflow: 'visible' }}>
        <Checkbox name="paid" label="Paid" disabled={disabled} />
      </FormField>
      <FormField styleValue={{ overflow: 'visible' }}>
        <Checkbox name="admin" label="Admin" disabled={disabled} />
      </FormField>
    </FormSection>
  );
});
