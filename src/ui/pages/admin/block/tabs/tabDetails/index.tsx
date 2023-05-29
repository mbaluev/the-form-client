import React, { ChangeEvent } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Form, FormField, FormSection } from '@components/form';
import { SelectFieldControl, TextFieldControl } from '@components/fields';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { SelectChangeEvent } from '@mui/material';

export const TabDetails = observer(() => {
  const { data, changeField, getError } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );
  const { list: modules } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };
  const changeSelectHandler = (e: SelectChangeEvent<unknown>) => {
    changeField(e.target.name, e.target.value);
  };

  return (
    <Form cols={1}>
      <FormSection>
        <FormField title="Id">
          <TextFieldControl name="id" disabled value={data?.id} />
        </FormField>
        <FormField title="Module">
          <SelectFieldControl
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
            required
          />
        </FormField>
        <FormField title="Title">
          <TextFieldControl
            name="title"
            value={data?.title}
            onChange={changeHandler}
            error={Boolean(getError('title'))}
            helperText={getError('title')?.message}
          />
        </FormField>
        <FormField title="Name">
          <TextFieldControl
            name="name"
            value={data?.name}
            multiline
            minRows={5}
            onChange={changeHandler}
            error={Boolean(getError('name'))}
            helperText={getError('name')?.message}
          />
        </FormField>
        <FormField title="Position">
          <TextFieldControl
            name="position"
            type="number"
            value={data?.position}
            onChange={changeHandler}
            error={Boolean(getError('position'))}
            helperText={getError('position')?.message}
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
