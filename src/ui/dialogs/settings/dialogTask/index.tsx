/* eslint-disable sonarjs/no-duplicate-string */
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
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { AsyncAutocompleteFieldControl } from '@components/fields/AsyncAutocompleteFieldControl';
import { IOptionViewModel } from '@viewModel/modules/common/option/interface';
import { ITaskViewModel } from '@viewModel/modules/entities/task/interface';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const DialogTask = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit } = props;
  const optionModel = useViewModel<IOptionViewModel>(VIEW_MODEL.Option);
  const { isLoading, getDocumentTypes } = optionModel;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
    validateModal,
  } = useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

  const { list: blocks, data: block } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };

  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData?.document?.name)) {
      return <React.Fragment>New homework task</React.Fragment>;
    }
    return <React.Fragment>{modalData.document.name}</React.Fragment>;
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
    if (block) changeModalField('blockId', block.id);
  }, [isOpen]);

  return (
    <Modal
      className="dialog-task"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField isRow title="Block">
            <SelectFieldControl
              name="blockId"
              value={modalData?.blockId}
              items={blocks?.map((d) => {
                return {
                  value: d.id,
                  label: d.title,
                };
              })}
              error={Boolean(getModalError('blockId'))}
              helperText={getModalError('blockId')?.message}
              disabled
            />
          </FormField>
          <FormField isRow title="Task type">
            <AsyncAutocompleteFieldControl
              value={{
                value: modalData?.document?.documentType?.id,
                label: modalData?.document?.documentType?.name || '',
              }}
              loading={isModalLoading || isLoading}
              promise={getDocumentTypes}
              error={Boolean(getModalError('document.documentTypeId'))}
              helperText={getModalError('document.documentTypeId')?.message}
              onChange={(e, value) => {
                changeModalField('document.documentTypeId', value?.value);
                changeModalField('document.documentType.id', value?.value);
                changeModalField('document.documentType.name', value?.label);
                validateModal();
              }}
              disableClearable
            />
          </FormField>
          <FormField title="Name">
            <TextFieldControl
              name="document.name"
              value={modalData?.document?.name}
              onChange={changeHandler}
              error={Boolean(getModalError('document.name'))}
              helperText={getModalError('document.name')?.message}
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
