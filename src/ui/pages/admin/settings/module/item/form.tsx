import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { Input } from '@ui/fields/input';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useModuleItemStore();
  const required = { required: 'required' };
  return (
    <FormSection>
      <FormField title="Id">
        <Input name="id" placeholder="id" disabled />
      </FormField>
      <FormField title="Title">
        <Input name="title" placeholder="title" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Name">
        <Input
          name="name"
          placeholder="name"
          rules={required}
          disabled={disabled}
          minRows={5}
          multiline
        />
      </FormField>
      <FormField title="Position">
        <Input
          name="position"
          placeholder="position"
          rules={required}
          disabled={disabled}
          inputType="number"
        />
      </FormField>
    </FormSection>
  );
});
