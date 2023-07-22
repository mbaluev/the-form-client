/* eslint-disable sonarjs/no-duplicate-string */
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
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  options?: DropzoneOptions;
  tooltip?: string;
}

export const DialogTaskUserDocument = observer((props: IProps) => {
  const { isOpen, onClose, onCancel, onSubmit, options, tooltip } = props;

  const {
    isModalLoading,
    modalData,
    changeModalField,
    getModalError,
    hasModalErrors,
    hasModalChanges,
    upload,
    download,
  } = useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };

  const uploadHandler = async (files: File[]) => {
    const newFile = await upload(files[0]);
    if (newFile) {
      changeModalField('document.file', newFile);
      changeModalField('document.fileId', newFile.id);
    }
  };
  const downloadHandler = async (id: string, filename: string) => {
    await download(id, filename);
  };

  const Label = () => {
    if (isModalLoading) {
      return <Skeleton width={200} />;
    }
    if (!modalData || (modalData && !modalData?.document?.name)) {
      return <React.Fragment>Sent homework</React.Fragment>;
    }
    return <React.Fragment>{modalData.document?.name}</React.Fragment>;
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
          <FormField title="Document name">
            <TextFieldControl
              name="document.name"
              value={modalData?.document?.name}
              onChange={changeHandler}
              error={Boolean(getModalError('document.name'))}
              helperText={getModalError('document.name')?.message}
            />
          </FormField>
          <FormField title="Document description">
            <TextFieldControl
              name="document.description"
              multiline
              minRows={5}
              value={modalData?.document?.description}
              onChange={changeHandler}
              error={Boolean(getModalError('document.description'))}
              helperText={getModalError('document.description')?.message}
            />
          </FormField>
          {(modalData?.document?.documentType?.name === 'link' ||
            modalData?.document?.documentType?.name === 'video') && (
            <FormField title="Link">
              <TextFieldControl
                name="document.url"
                value={modalData?.document?.url}
                onChange={changeHandler}
                error={Boolean(getModalError('document.url'))}
                helperText={getModalError('document.url')?.message}
              />
            </FormField>
          )}
          {modalData?.document?.documentType?.name === 'file' && (
            <FormField title="Attachment">
              <Attachment
                options={options}
                tooltip={tooltip}
                loading={isModalLoading}
                onUpload={uploadHandler}
                onDownload={downloadHandler}
                error={Boolean(getModalError('document.fileId'))}
                helperText={getModalError('document.fileId')?.message}
                files={
                  modalData?.document?.file
                    ? [modalData.document.file]
                    : undefined
                }
              />
            </FormField>
          )}
        </FormSection>
      </Form>
    </Modal>
  );
});
