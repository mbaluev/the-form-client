import { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormSection } from '@components/form/section';
import { FormField } from '@components/form/field';
import { TextInputField } from '@components/fields/textInputField';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { SelectField } from '@components/fields/selectField';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';
import { SelectChangeEvent, Skeleton } from '@mui/material';

export const Form = observer(() => {
  const { data, changeField, getError, hasErrors, isSaveLoading } = useBlockItemStore();
  const { data: modules, isLoading: loadingModules } = useModuleListStore();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.name, e.target.value);
  };
  const changeSelectHandler = (e: SelectChangeEvent<unknown>) => {
    changeField(e.target.name, e.target.value);
  };

  useEffect(() => {}, [hasErrors]);

  return (
    <FormSection>
      <FormField title="Id">
        <TextInputField name="id" disabled value={data?.id} />
      </FormField>
      <FormField title="Module">
        {loadingModules ? (
          <Skeleton width={100} />
        ) : (
          <SelectField
            name="moduleId"
            value={data?.moduleId}
            items={modules?.map((d) => {
              return {
                value: d.id,
                label: d.title,
              };
            })}
            onChange={changeSelectHandler}
            error={Boolean(getError('moduleId'))}
            helperText={getError('moduleId')?.message}
            disabled={isSaveLoading}
          />
        )}
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
