import React, { ChangeEvent } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { IBlockViewModel } from '@viewModel/modules/block/interface';

export const TabDetails = observer(() => {
  const { data, changeField, getError } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeField(e.target.name, e.target.value);
  };

  return (
    <Form cols={1}>
      <FormSection>
        <FormField isRow title="Id">
          <TextFieldControl name="id" disabled value={data?.id} />
        </FormField>
        <FormField isRow title="Title">
          <TextFieldControl
            name="title"
            value={data?.title}
            onChange={changeHandler}
            error={Boolean(getError('title'))}
            helperText={getError('title')?.message}
          />
        </FormField>
        <FormField isRow title="Name">
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
      </FormSection>
    </Form>
  );
});
