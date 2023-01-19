import React, { ChangeEvent } from 'react';
import { Modal } from '@components/modal';
import { Attachment } from '@components/attachment';
import { DropzoneOptions } from 'react-dropzone';
import { Form, FormField, FormSection } from '@components/form';
import { SelectFieldControl, TextFieldControl } from '@components/fields';
import { IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { Skeleton } from '@components/skeleton';
import { ITaskViewModel } from '@viewModel/modules/task/interface';
import { IconButton } from '@components/iconButton';
import { Add, Delete } from '@mui/icons-material';
import { TTaskAnswerType } from '@model/task';
import { Divider, SelectChangeEvent } from '@mui/material';
import './index.scss';
import { NoData } from '@components/noData';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  options?: DropzoneOptions;
  tooltip?: string;
}

export const DialogTask = observer((props: IProps) => {
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
    type,
    title,
    setType,
    setTitle,
    addAnswer,
    removeAnswer,
  } = useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

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
    if (!modalData || (modalData && !modalData.document?.name)) {
      return <React.Fragment>New homework task</React.Fragment>;
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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeModalField(e.target.name, e.target.value);
  };
  const onChangeType = (e: SelectChangeEvent<unknown>) => {
    setType(e.target.value as TTaskAnswerType);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Modal
      className="dialog-task"
      title={<Label />}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    >
      <Loader loading={isModalLoading} />
      <Form cols={2}>
        <FormSection>
          <FormField title="File name">
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
                  ? [modalData?.document?.file]
                  : undefined
              }
            />
          </FormField>
        </FormSection>
        <FormSection>
          <FormField title="Answer types">
            <SelectFieldControl
              name="type"
              required
              items={[
                { label: 'File', value: 'file' },
                { label: 'Link', value: 'link' },
              ]}
              value={type}
              onChange={onChangeType}
            />
          </FormField>
          <FormField
            actions={[
              <IconButton
                tooltip="Add"
                onClick={addAnswer}
                disabled={!Boolean(title)}
              >
                <Add />
              </IconButton>,
            ]}
          >
            <TextFieldControl
              name="title"
              placeholder="Title"
              value={title}
              onChange={onChangeTitle}
              error={Boolean(getModalError('taskAnswers'))}
              className="dialog-task__answer"
            />
          </FormField>
          {modalData?.taskAnswers ? (
            modalData?.taskAnswers.map((answer, index) => (
              <React.Fragment>
                <Divider />
                <FormField
                  key={index}
                  actions={[
                    <IconButton
                      tooltip="Delete"
                      onClick={() => removeAnswer(answer.id)}
                    >
                      <Delete />
                    </IconButton>,
                  ]}
                >
                  <div className="dialog-task__answer">{`${answer.type}: ${answer.title}`}</div>
                </FormField>
              </React.Fragment>
            ))
          ) : (
            <NoData
              message="No answer types found"
              messageClassName="color_red"
            />
          )}
        </FormSection>
      </Form>
    </Modal>
  );
});
