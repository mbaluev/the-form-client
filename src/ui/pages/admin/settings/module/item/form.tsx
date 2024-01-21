import { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';

export const Form = observer(() => {
  const { data, changeField, getError, hasErrors, isSaveLoading } = useModuleItemStore();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.name, e.target.value);
  };
  useEffect(() => {}, [hasErrors]);

  return (
    <FormSection>
      <FormField title="Id">
        <TextInputField name="id" disabled value={data?.id} />
      </FormField>
      <FormField title="Title">
        <TextInputField
          name="title"
          value={data?.title}
          onChange={changeHandler}
          error={Boolean(getError('title'))}
          helperText={getError('title')?.message}
          disabled={isSaveLoading}
        />
      </FormField>
      <FormField title="Name">
        <TextInputField
          name="name"
          value={data?.name}
          onChange={changeHandler}
          error={Boolean(getError('name'))}
          helperText={getError('name')?.message}
          disabled={isSaveLoading}
          minRows={5}
          multiline
        />
      </FormField>
      <FormField title="Position">
        <TextInputField
          name="position"
          value={data?.position}
          onChange={changeHandler}
          error={Boolean(getError('position'))}
          helperText={getError('position')?.message}
          disabled={isSaveLoading}
          inputType="number"
        />
      </FormField>
    </FormSection>
  );
});
