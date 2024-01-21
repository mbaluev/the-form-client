import { useRouter } from 'next/router';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { Input } from '@ui/fields/input';
import { Password } from '@ui/fields/password';
import { Checkbox } from '@ui/fields/checkbox';
import { Box } from '@mui/material';

export const Form = () => {
  const router = useRouter();
  const id = router.query.id;
  const isCreate = id === 'create';
  return (
    <Box paddingLeft={3} paddingRight={3} overflow="auto">
      <FormSection>
        <FormField title="Id">
          <Input name="id" placeholder="id" disabled />
        </FormField>
        <FormField title="First name">
          <Input name="firstname" placeholder="first name" rules={{ required: 'required' }} />
        </FormField>
        <FormField title="Last name">
          <Input name="lastname" placeholder="last name" rules={{ required: 'required' }} />
        </FormField>
        <FormField title="Email">
          <Input name="username" placeholder="email" rules={{ required: 'required' }} />
        </FormField>
        {isCreate && (
          <FormField title="Password">
            <Password name="password" placeholder="password" rules={{ required: 'required' }} />
          </FormField>
        )}
        <FormField styleValue={{ overflow: 'visible' }}>
          <Checkbox name="active" label="Active" />
        </FormField>
        <FormField styleValue={{ overflow: 'visible' }}>
          <Checkbox name="paid" label="Paid" />
        </FormField>
        <FormField styleValue={{ overflow: 'visible' }}>
          <Checkbox name="admin" label="Admin" />
        </FormField>
      </FormSection>
    </Box>
  );
};
