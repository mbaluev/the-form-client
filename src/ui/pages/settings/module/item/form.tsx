import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { useModuleSettingsItemStore } from '@store/modules/settings/module/item/hook';
import { Input } from '@ui/fields/input';
import { Count } from '@ui/fields/counter';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useModuleSettingsItemStore();
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
        <Count name="position" rules={required} disabled={disabled} />
      </FormField>
    </FormSection>
  );
});
