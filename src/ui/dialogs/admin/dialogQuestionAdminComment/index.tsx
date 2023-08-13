/* eslint-disable sonarjs/no-duplicate-string */
import React, { ChangeEvent } from 'react';
import { Modal } from '@components/modal';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogQuestionAdminComment = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
  } = useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
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
      className="dialog-material"
      title={modalData?.question?.title}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="Comment">
            <TextFieldControl
              name="commentText"
              value={modalData?.commentText}
              onChange={changeHandler}
              error={Boolean(getModalError('commentText'))}
              helperText={getModalError('commentText')?.message}
              multiline
              minRows={15}
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
