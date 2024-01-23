import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { Input } from '@ui/fields/input';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';
import { Select } from '@ui/fields/select';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';

export const Form = observer(() => {
  const { isSaveLoading: disabled } = useBlockItemStore();
  const { dataItems: modules } = useModuleListStore();

  const router = useRouter();
  const isModule =
    router.pathname === ROUTES.ADMIN_SETTINGS_MODULE_BLOCK.path ||
    router.pathname === ROUTES.ADMIN_SETTINGS_MODULE_BLOCK_CREATE.path;

  const required = { required: 'required' };
  return (
    <FormSection>
      <FormField title="Id">
        <Input name="id" placeholder="id" disabled />
      </FormField>
      <FormField title="Module">
        <Select name="moduleId" items={modules} rules={required} disabled={disabled || isModule} />
      </FormField>
      <FormField title="Title">
        <Input name="title" placeholder="title" rules={required} disabled={disabled} />
      </FormField>
      <FormField title="Name">
        <Input name="name" placeholder="name" rules={required} disabled={disabled} />
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
