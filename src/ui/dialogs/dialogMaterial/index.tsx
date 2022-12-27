import React, { ChangeEvent } from 'react';
import { Modal } from '@components/modal';
import { Attachment } from '@components/attachment';
import { DropzoneOptions } from 'react-dropzone';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  options?: DropzoneOptions;
  tooltip?: string;
}

export const DialogMaterial = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit, options, tooltip } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
    upload,
  } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };
  const uploadHandler = async (files: File[]) => {
    const newFiles = await upload(files);
    if (newFiles) {
      changeModalField('file.id', newFiles[0].id);
      changeModalField('file.name', newFiles[0].name);
      changeModalField('file.size', newFiles[0].size);
      changeModalField('file.path', newFiles[0].path);
    }
  };

  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData.name)) {
      return <React.Fragment>New material</React.Fragment>;
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
      className="dialog-material"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="File name">
            <TextFieldControl
              name="name"
              value={modalData?.name}
              onChange={changeHandler}
              error={Boolean(getModalError('name'))}
              helperText={getModalError('name')?.message}
            />
          </FormField>
          <FormField title="Description">
            <TextFieldControl
              name="description"
              multiline
              minRows={5}
              value={modalData?.description}
              onChange={changeHandler}
              error={Boolean(getModalError('description'))}
              helperText={getModalError('description')?.message}
            />
          </FormField>
          <FormField title="Attachment">
            <Attachment
              options={options}
              tooltip={tooltip}
              loading={isModalLoading}
              onUpload={uploadHandler}
              error={Boolean(getModalError('file.path'))}
              helperText={getModalError('file.path')?.message}
              files={modalData?.file ? [modalData?.file] : undefined}
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
