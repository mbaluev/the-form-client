import { useRouter } from 'next/router';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { Input } from '@ui/fields/input';
import { Password } from '@ui/fields/password';
import { Checkbox } from '@ui/fields/checkbox';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useUserItemStore();

  const router = useRouter();
  const id = router.query.id;
  const isCreate = id === 'create';
  const required = { required: 'required' };

  return (
    <Box paddingLeft={3} paddingRight={3} overflow="auto">
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
    </Box>
  );
});
