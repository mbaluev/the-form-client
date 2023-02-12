import React, { ChangeEvent, useEffect } from 'react';
import { Modal } from '@components/modal';
import { Form, FormField, FormSection } from '@components/form';
import { SelectFieldControl, TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { SelectChangeEvent } from '@mui/material';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogBlock = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const { list: modules, data: module } = useViewModel<IModuleViewModel>(
    VIEW_MODEL.Module
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeModalField(e.target.name, e.target.value);
  };
  const changeSelectHandler = (e: SelectChangeEvent<unknown>) => {
    changeModalField(e.target.name, e.target.value);
  };
  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData.name)) {
      return <React.Fragment>New block</React.Fragment>;
    }
    return <React.Fragment>{modalData.name}</React.Fragment>;
  };
  const footerButtons: IButtonProps[] = [
    {
      children: 'Cancel',
      variant: 'outlined',
      color: 'grey',
      onClick: onCancel,
    },
    {
      children: 'Save',
      variant: 'contained',
      color: 'blue',
      onClick: onSubmit,
      disabled: hasModalErrors || !hasModalChanges,
    },
  ];

  useEffect(() => {
    if (module) changeModalField('moduleId', module.id);
  }, [isOpen]);

  return (
    <Modal
      className="dialog-block"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="Module">
            <SelectFieldControl
              name="moduleId"
              value={modalData?.moduleId}
              items={modules?.map((d) => {
                return {
                  value: d.id,
                  label: d.title,
                };
              })}
              onChange={changeSelectHandler}
              error={Boolean(getModalError('moduleId'))}
              helperText={getModalError('moduleId')?.message}
              required
            />
          </FormField>
          <FormField title="Title">
            <TextFieldControl
              name="title"
              value={modalData?.title}
              onChange={changeHandler}
              error={Boolean(getModalError('title'))}
              helperText={getModalError('title')?.message}
            />
          </FormField>
          <FormField title="Name">
            <TextFieldControl
              name="name"
              multiline
              minRows={5}
              value={modalData?.name}
              onChange={changeHandler}
              error={Boolean(getModalError('name'))}
              helperText={getModalError('name')?.message}
            />
          </FormField>
          <FormField title="Position">
            <TextFieldControl
              name="position"
              type="number"
              value={modalData?.position}
              onChange={changeHandler}
              error={Boolean(getModalError('position'))}
              helperText={getModalError('position')?.message}
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
