import React, { ChangeEvent } from 'react';
import { Modal } from '@components/modal';
import { Form, FormField, FormSection } from '@components/form';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import {
  CheckboxFieldControl,
  PasswordFieldControl,
  TextFieldControl,
} from '@components/fields';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogUser = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeModalField(e.target.name, e.target.checked);
  };

  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData.username)) {
      return <React.Fragment>New user</React.Fragment>;
    }
    return <React.Fragment>{modalData.username}</React.Fragment>;
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
      className="dialog-user"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="Email">
            <TextFieldControl
              name="username"
              value={modalData?.username}
              onChange={changeHandler}
              error={Boolean(getModalError('username'))}
              helperText={getModalError('username')?.message}
            />
          </FormField>
          <FormField title="Password">
            <PasswordFieldControl
              name="password"
              value={modalData?.password}
              onChange={changeHandler}
              error={Boolean(getModalError('password'))}
              helperText={getModalError('password')?.message}
            />
          </FormField>
          <FormField>
            <CheckboxFieldControl
              name="active"
              label="Active"
              value={modalData?.active}
              onChange={changeCheckboxHandler}
            />
          </FormField>
          <FormField>
            <CheckboxFieldControl
              name="paid"
              label="Paid"
              value={modalData?.paid}
              onChange={changeCheckboxHandler}
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
