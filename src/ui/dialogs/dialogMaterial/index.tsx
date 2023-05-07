import React, { ChangeEvent, useEffect } from 'react';
import { Modal } from '@components/modal';
import { Attachment } from '@components/attachment';
import { DropzoneOptions } from 'react-dropzone';
import { Form, FormField, FormSection } from '@components/form';
import { SelectFieldControl, TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { IBlockViewModel } from '@viewModel/modules/block/interface';

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
    download,
  } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  const { list: blocks, data: block } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };

  const pathFileId = 'document.file.id';
  const pathFileName = 'document.file.name';
  const pathFileSize = 'document.file.size';
  const pathFileMimeType = 'document.file.mimetype';
  const pathFilePath = 'document.file.path';
  const uploadHandler = async (files: File[]) => {
    const newFile = await upload(files[0]);
    if (newFile) {
      changeModalField(pathFileId, newFile.id);
      changeModalField(pathFileName, newFile.name);
      changeModalField(pathFileSize, newFile.size);
      changeModalField(pathFileMimeType, newFile.mimetype);
      changeModalField(pathFilePath, newFile.path);
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
      return <React.Fragment>New material</React.Fragment>;
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
      className="dialog-material"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={1}>
        <FormSection>
          <FormField title="Block">
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
          <FormField title="Material name">
            <TextFieldControl
              name="document.name"
              value={modalData?.document?.name}
              onChange={changeHandler}
              error={Boolean(getModalError('document.name'))}
              helperText={getModalError('document.name')?.message}
            />
          </FormField>
          <FormField title="Description">
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
          <FormField title="Attachment">
            <Attachment
              options={options}
              tooltip={tooltip}
              loading={isModalLoading}
              onUpload={uploadHandler}
              onDownload={downloadHandler}
              error={Boolean(getModalError(pathFileId))}
              helperText={getModalError(pathFileId)?.message}
              files={
                modalData?.document?.file
                  ? [modalData.document.file]
                  : undefined
              }
            />
          </FormField>
        </FormSection>
      </Form>
    </Modal>
  );
});
