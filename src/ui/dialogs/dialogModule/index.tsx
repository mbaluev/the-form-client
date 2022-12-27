import React, { ChangeEvent } from 'react';
import { Modal } from '@components/modal';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { IModuleViewModel } from '@viewModel/modules/module/interface';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogModule = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };

  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData.name)) {
      return <React.Fragment>New module</React.Fragment>;
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

  return (
    <Modal
      className="dialog-module"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
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
        </FormSection>
      </Form>
    </Modal>
  );
});
