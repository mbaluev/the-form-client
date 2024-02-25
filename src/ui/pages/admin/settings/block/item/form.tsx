import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/settings/item/hook';
import { Input } from '@ui/fields/input';
import { useModuleSettingsListStore } from '@store/modules/settings/module/settings/list/hook';
import { Select } from '@ui/fields/select';
import { Count } from '@ui/fields/counter';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useBlockSettingsItemStore();
  const { dataItems: modules } = useModuleSettingsListStore();
  const required = { required: 'required' };
  return (
    <FormSection>
      <FormField title="Id">
        <Input name="id" placeholder="id" disabled />
      </FormField>
      <FormField title="Module">
        <Select name="moduleId" items={modules} rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Title">
        <Input name="title" placeholder="title" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Name">
        <Input name="name" placeholder="name" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Position">
        <Count name="position" rules={required} disabled={disabled} />
      </FormField>
    </FormSection>
  );
});
